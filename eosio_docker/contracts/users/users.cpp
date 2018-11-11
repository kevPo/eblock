#include <users/users.hpp>

namespace eblock {
    void users::add(name account, string first_name, string last_name, string address) {
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

    void users::pay(name payer, name receiver, double token_amount) {
        // require_auth(payer);

        asset to_transfer = asset(token_amount, symbol(symbol_code("EBL"), 4));

        print("#############");
        print(to_transfer);
        print("#############");

        INLINE_ACTION_SENDER(eosio::token, transfer)(
        "eosio.token"_n, { {payer, "active"_n} },
            { payer, receiver, to_transfer, std::string("memo") }
        );
        // action transfer = action(
        // permission_level{payer,"active"_n},
        // "eosio.token"_n,
        // "transfer"_n,
        // std::make_tuple(payer.value, receiver.value, to_transfer, "")
        // );

        // transfer.send();

        //TODO: execute token transactions
        //cleos push action eosio.token transfer '[ "alice", "bob", "25.0000 SYS", "m" ]' -p alice@active
        //cleos push action users pay '["alice", "bob", "25"]' -p alice@active

        //cleos get table users users users

        //cleos set account permission alice active '{"keys":[{"key":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"users","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p alice@active
    }

}