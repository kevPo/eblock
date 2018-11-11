#!/usr/bin/env bash

# set PATH
PATH="$PATH:/opt/eosio/bin:~/bin"

# change to script directory
cd "$(dirname "$0")"

# create user accounts
jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  first=$(jq -r '.first' <<< "$i")
  last=$(jq -r '.last' <<< "$i")

  cleos push action users add '["'$name'", "'$first'", "'$last'", ""]' -p $name
done

# create locations
cleos push action locations add '["bob1", "bob", "Bob''s Garage Station", 37.778519, -122.415838, "94103", 300]' -p bob
cleos push action locations updatecharge '["bob" "bob1", 225]' -p bob
cleos push action locations add '["cindy1", "cindy", "The Hook Up", 37.778519, -122.415838, "94103", 300]' -p cindy
cleos push action locations updatecharge '["cindy" "cindy1", 300]' -p cindy
cleos push action locations add '["james1", "james", "My Money Maker", 37.780478, -122.406385, "94103", 300]' -p james
cleos push action locations updatecharge '["james" "james1", 100]' -p james
cleos push action locations add '["diane1", "diane", "Charge It Stop", 37.782903, -122.422339, "94103", 300]' -p diane
cleos push action locations updatecharge '["diane" "diane1", 0]' -p diane