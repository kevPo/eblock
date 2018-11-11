#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

if [ -e "/mnt/dev/data/initialized" ]
then
    source /opt/eosio/bin/scripts/continue_blockchain.sh
else
    source /opt/eosio/bin/scripts/init_blockchain.sh
fi