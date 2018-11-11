#include <Locations/Locations.hpp>

namespace eblock {
    void Locations::addloc(name id, name owner, string name, double latitude, double longitude, string zip, double max_charge) {
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
            location.in_use = false;
        });
    }

    void Locations::updatecharge(name owner, name location_id, double new_charge_amount) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        auto iterator = locations.find(location_id.value);
        eosio_assert(iterator != locations.end(), "Location not found");

        locations.modify(iterator, owner, [&](auto& location) {
            location.current_charge = new_charge_amount;
        });
    }

    void Locations::inittrans(name owner, name location_id) {
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

    void Locations::endtrans(name owner, name buyer, name location_id, double actual_amount) {
        require_auth(owner);
        location_table locations(_code, _code.value);
        
        //Update in_use to false
        auto iterator = locations.find(location_id.value);
        eosio_assert(iterator != locations.end(), "Location not found");
        locations.modify(iterator, owner, [&](auto& location) {
            location.in_use = false;
            location.current_charge -= actual_amount;
        });

        //invoke external inline action on users
        double token_amount = (*iterator).rate_per_kilowatt * actual_amount;
        pay_users(buyer, owner, token_amount);

        //TODO upgrade to use Demux!
        //Implement reverse escrow based on inittrans action
    }

    void Locations::pay_users(name payer, name receiver, double token_amount) {
        action pay_users = action(
        permission_level{payer,"active"_n},
        "eblockacc"_n,
        "pay"_n,
        std::make_tuple(payer, receiver, token_amount)
        );

        pay_users.send();
    }
}