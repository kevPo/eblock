#include <Users/Users.hpp>

namespace eblock {
    void Users::adduser(name account, string first_name, string last_name, string address) {
        require_auth(account);
        user_table users(_code, _code.value);
        
        auto iterator = users.find(account.value);
        eosio_assert(iterator == users.end(), "Account already exists");

        users.emplace(account, [&](auto& user) {
            user.account = account;
            user.first_name = first_name;
            user.last_name = last_name;
            user.address = address;
            user.has_charge_locations = false;
        });
    }

    void Users::pay(name payer, name receiver, double token_amount) {
        require_auth(payer);

        asset to_transfer = asset(token_amount, symbol(symbol_code("EBL"), 4));

        action transfer = action(
        permission_level{payer,"active"_n},
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(payer, receiver, to_transfer, "")
        );

        transfer.send();

        //TODO: execute token transactions
        //cleos push action eosio.token transfer '[ "alice", "bob", "25.0000 SYS", "m" ]' -p alice@active
    }
}