#include <Locations/Locations.hpp>

namespace eblock {
    void Locations::add(name id, name owner, string name, double latitude, double longitude, string zip, double max_charge) {
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
}