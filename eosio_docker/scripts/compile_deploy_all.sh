#!/usr/bin/env bash

for file in contracts/*/ ; do 
  if [[ -d "$file" && ! -L "$file" && "$file" != *"compiled_contracts"* ]]; then
    contract="$(basename "$file")"
    source ./scripts/deploy_contract.sh $contract $contract eblockwal $(cat eblock_wallet_password.txt)
  fi; 
done