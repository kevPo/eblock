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
                double rate_per_kilowatt;
                bool   in_use;

                auto primary_key() const { return key.value; }
                uint64_t get_by_user() const { return owner.value; }
            };

            ACTION addloc(name id, name owner, string name, double latitude, double longitude, string zip, double max_charge);

            ACTION updatecharge(name owner, name location_id, double new_charge_amount);

            ACTION inittrans(name owner, name location_id);

            ACTION endtrans(name owner, name buyer, name location_id, double actual_amount);

            typedef eosio::multi_index< "locations"_n, location,
                indexed_by< name("getbyuser"), const_mem_fun<location, uint64_t, &location::get_by_user> > > location_table;

                
        private:
            void pay_users(name payer, name receiver, double amount);
    };

    EOSIO_DISPATCH(Locations, (addloc)(updatecharge)(inittrans)(endtrans))
}