#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

// Replace the contract class name when you start your own project
CONTRACT energychain : public eosio::contract {
  private:

    TABLE chargelocation {
      uint64_t      prim_key;
      uint64_t      energy_user;
      string   latitude;
      string   longitude;
      string   zip;
      long double  current_amount;
      long double  max_amount;

      auto primary_key() const { return prim_key; }
      uint64_t get_by_user() const { return energy_user; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("chargelocation"), chargelocation,
      indexed_by< name("getbyuser"), const_mem_fun<chargelocation, uint64_t, &chargelocation::get_by_user> >
      > charge_location_table;

    charge_location_table _charge_locations;

    TABLE energy_user {
      uint64_t      prim_key;  
      name          user;     
      string   first_name;
      string   last_name;
      string   address;
      bool     has_charge_locations;

      auto primary_key() const { return prim_key; }
      // only supports uint64_t, uint128_t, uint256_t, double or long double
      uint64_t get_by_user() const { return user.value; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("energy_user"), energy_user,
      indexed_by< name("getbyuser"), const_mem_fun<energy_user, uint64_t, &energy_user::get_by_user> >
      > energy_user_table;

    energy_user_table _energy_users;

  public:
    using contract::contract;

    // constructor
    energychain( name receiver, name code, datastream<const char*> ds ):
                contract( receiver, code, ds ),
                _charge_locations( receiver, receiver.value ),
                _energy_users( receiver, receiver.value ) {}

    ACTION energy_transfer( name user, string& note ) {
      // to sign the action with the given account
      require_auth( user );

      //TODO: Implement energy transfer 
    }

    ACTION energy_update( name user, string& note ) {
      // to sign the action with the given account
      require_auth( user );

      //TODO: Implement energy update 
    }

    ACTION find_energy( name user, string& note ) {
      // to sign the action with the given account
      require_auth( user );

      //TODO: Implement find energy
    }

};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH( energychain, (energy_transfer) (energy_update) (find_energy) )
