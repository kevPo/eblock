#!/bin/bash
set -o errexit

echo "=== start deploy data ==="

# set PATH
PATH="$PATH:/opt/eosio/bin"

# change to script directory
cd "$(dirname "$0")"

echo "=== start create accounts in blockchain ==="

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file, import keys and create accounts
# these pre-created accounts will be used for saving / erasing notes
# we hardcoded each account name, public and private key in the json.
# NEVER store the private key in any source code in your real life developmemnt
# This is just for demo purpose

jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  pub=$(jq -r '.publicKey' <<< "$i")
  priv=$(jq -r '.privateKey' <<< "$i")

  to simplify, we use the same key for owner and active key of each account
  cleos create account eosio $name $pub $pub
  cleos wallet import -n eblockwal --private-key $priv
  cleos push action eosio.token issue '["'$name'", "1000.0000 EBL", "initial issue"]' -p eosio@active
  # cleos set account permission $name active '{"keys":[{"key":"'$pub'", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p "$name"
  # cleos set account permission $name active '{"keys":[{"key":"'$pub'", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p "$name"
done

cleos set account permission bob active {"keys":[{"key":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p bob
cleos set account permission tom active {"keys":[{"key":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p tom
cleos set account permission alice active {"keys":[{"key":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p alice
cleos set account permission diane active {"keys":[{"key":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p diane
cleos set account permission james active {"keys":[{"key":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p james
cleos set account permission cindy active {"keys":[{"key":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p cindy
cleos set account permission travis active {"keys":[{"key":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}} -p travis


cleos set account permission bob active {"keys":[{"key":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p bob
cleos set account permission tom active {"keys":[{"key":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p tom
cleos set account permission alice active {"keys":[{"key":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p alice
cleos set account permission diane active {"keys":[{"key":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p diane
cleos set account permission james active {"keys":[{"key":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p james
cleos set account permission cindy active {"keys":[{"key":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p cindy
cleos set account permission travis active {"keys":[{"key":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"locations","permission":"eosio.code"},"weight":1}],"waits":[]}} -p travis
