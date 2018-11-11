#!/usr/bin/env bash

for file in contracts/*/ ; do 
  if [[ -d "$file" && ! -L "$file" && "$file" != *"compiled_contracts"* ]]; then
    contract="$(basename "$file")"
    source ./scripts/deploy_contract.sh $contract $contract eblockwal $(cat ""$contract"_owner_key.txt") $(cat ""$contract"_active_key.txt")
  fi; 
done