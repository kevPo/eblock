#include <Users/Users.hpp>

namespace eblock {
    void Users::add(name account, string first_name, string last_name, string address) {
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

    // ACTION pay(name payer, name receiver, double amount);
    void Users::pay(name payer, name receiver, double amount) {
        require_auth(payer);

        //TODO: execute token transactions
    }
}