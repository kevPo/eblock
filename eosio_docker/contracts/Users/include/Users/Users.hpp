#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

namespace eblock {    
    using namespace eosio;
    using namespace std;

    CONTRACT Users : public contract {
        using contract::contract;

        public:
            Users(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

            TABLE user { 
                name account;     
                string first_name;
                string last_name;
                string address;
                bool has_charge_locations;

                auto primary_key() const { return account.value; }

                EOSLIB_SERIALIZE(user, (account)(first_name)(last_name)(address)(has_charge_locations));
            };

            ACTION add(name account, string first_name, string last_name, string address);
            ACTION pay(name account, name recipient , double amount);

            typedef eosio::multi_index<"users"_n, user> user_table;
    };

    EOSIO_DISPATCH(Users, (add))
}