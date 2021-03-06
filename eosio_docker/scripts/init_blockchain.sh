#!/usr/bin/env bash
# set -o errexit

# echo "=== setup blockchain accounts and smart contract ==="

# # set PATH
# PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

# set -m

echo "=== install EOSIO.CDT (Contract Development Toolkit) ==="
apt install /opt/eosio/bin/scripts/eosio.cdt-1.3.2.x86_64.deb

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: eblockwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n eblockwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eblock_wallet_password.txt

cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > eblock_wallet_owner_key.txt
cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > eblock_wallet_active_key.txt

cleos create account eosio eblockacc $(cat eblock_wallet_owner_key.txt) $(cat eblock_wallet_active_key.txt)

cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > token_owner_key.txt
cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > token_active_key.txt

cleos create account eosio eosio.token $(cat token_owner_key.txt) $(cat token_active_key.txt)

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
for file in contracts/*/ ; do 
  if [[ -d "$file" && ! -L "$file" ]]; then
    contract="$(basename "$file")"
    cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > ""$contract"_owner_key.txt"
    cleos wallet create_key -n eblockwal | tail -1 | sed -r 's/^.*"(.*)"$/\1/' > ""$contract"_active_key.txt"
    cleos create account eosio "$contract" $(cat ""$contract"_owner_key.txt") $(cat ""$contract"_active_key.txt")
    deploy_contract.sh "$contract" "$contract" eblockwal $(cat eblock_wallet_password.txt)
  fi; 
done

cleos set contract eosio.token /contracts/eosio.token -p eosio.token

echo "=== create token === "
cleos push action eosio.token create '{"issuer":"eosio", "maximum_supply":"1000000000.0000 EBL"}' -p eosio.token

echo "=== create user accounts ==="
create_accounts.sh


echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
