#include <eosiolib/eosio.hpp>

namespace eblock {    
    using namespace eosio;
    using namespace std;

    CONTRACT Locations : public contract {
        using contract::contract;

        public:
            Locations(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

            TABLE location {
                name key;
                name owner;
                string name;
                double latitude;
                double longitude;
                string zip;
                double current_charge;
                double max_charge;

                auto primary_key() const { return key.value; }
                uint64_t get_by_user() const { return owner.value; }
            };

            ACTION add(name id, name owner, string name, double latitude, double longitude, string zip, double max_charge);

            ACTION updatecharge(name owner, name location_id, double new_charge_amount);

            typedef eosio::multi_index< "locations"_n, location,
                indexed_by< name("getbyuser"), const_mem_fun<location, uint64_t, &location::get_by_user> > > location_table;
    };

    EOSIO_DISPATCH(Locations, (add)(updatecharge))
}