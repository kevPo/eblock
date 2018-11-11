#include <locations/locations.hpp>

namespace eblock {
    void locations::add(name id, name owner, string name, double latitude, double longitude, string zip, double max_charge) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        auto iterator = locations.find(id.value);
        eosio_assert(iterator == locations.end(), "Location with that ID exists");

        locations.emplace(owner, [&](auto& location) {
            location.key = id;
            location.owner = owner;
            location.name = name;
            location.latitude = latitude;
            location.longitude = longitude;
            location.zip = zip;
            location.current_charge = 0;
            location.max_charge = max_charge;
            location.rate_per_kilowatt = 0.1;
            location.in_use = false;
        });
    }

    void locations::updatecharge(name owner, name location_id, double new_charge_amount) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        auto iterator = locations.find(location_id.value);
        eosio_assert(iterator != locations.end(), "Location not found");

        locations.modify(iterator, owner, [&](auto& location) {
            location.current_charge = new_charge_amount;
        });
    }

    void locations::inittrans(name owner, name location_id) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        //update in_use to true
        auto iterator = locations.find(location_id.value);
        eosio_assert(iterator != locations.end(), "Location not found");
        locations.modify(iterator, owner, [&](auto& location) {
            location.in_use = true;
        });
        
        //TODO upgrade to use Demux!
        //Implement escrow/preauth amount, Once we implement Demux we will 
        // implement standard payment authorization procedures
    }

    void locations::endtrans(name owner, name buyer, name location_id, double actual_amount) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        //Update in_use to false
        auto iterator = locations.find(location_id.value);
        eosio_assert(iterator != locations.end(), "Location not found");
        locations.modify(iterator, owner, [&](auto& location) {
            location.in_use = false;
            location.current_charge -= actual_amount;
        });

        //TODO upgrade to use Demux!
        //Implement reverse escrow based on inittrans action
    }
}