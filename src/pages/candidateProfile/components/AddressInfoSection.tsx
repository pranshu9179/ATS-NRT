import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa";

const AddressSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);

  const [currentAddress, setCurrentAddress] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    section === "current"
      ? setCurrentAddress({ ...currentAddress, [field]: value })
      : setPermanentAddress({ ...permanentAddress, [field]: value });
  };

  const handleSelect = (value, section, field) => {
    section === "current"
      ? setCurrentAddress({ ...currentAddress, [field]: value })
      : setPermanentAddress({ ...permanentAddress, [field]: value });
  };

  const handleSave = () => {
    if (sameAsCurrent) {
      setPermanentAddress({ ...currentAddress });
    }
    setAddressSaved(true);
    setShowForm(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowForm(false);
  };

  const countries = Country.getAllCountries();
  const getStates = (countryCode) => State.getStatesOfCountry(countryCode);
  const getCities = (countryCode, stateCode) =>
    City.getCitiesOfState(countryCode, stateCode);

  return (
    <Card className="p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Address Information</h2>
        <Button
          variant="outline"
          onClick={() => {
            setShowForm(true);
            setIsEditing(true);
          } }
          className="gap-2" size={undefined}        >
          <FaPlus />
          {addressSaved ? "Edit Address" : "Add Address"}
        </Button>
      </div>

      {showForm ? (
        <div className="bg-[#f1f5f9] dark:bg-[#111] rounded-lg p-4 space-y-4">
          {/* ====== Current Address ====== */}
          <h3 className="font-medium text-base">Current Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <label className="text-sm">Country</label>
              <Select
                value={currentAddress.country}
                onValueChange={(val) => handleSelect(val, "current", "country")}
              >
                <SelectTrigger className= "w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className={undefined} >
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode} className={undefined} >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div>
              <label className="text-sm">State</label>
              <Select
                value={currentAddress.state}
                onValueChange={(val) => handleSelect(val, "current", "state")}
                disabled={!currentAddress.country}
              >
                <SelectTrigger className= "w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  <SelectGroup>
                    {getStates(currentAddress.country).map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode} className={undefined}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div>
              <label className="text-sm">City</label>
              <Select
                value={currentAddress.city}
                onValueChange={(val) => handleSelect(val, "current", "city")}
                disabled={!currentAddress.state}
              >
                <SelectTrigger className= "w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  <SelectGroup>
                    {getCities(currentAddress.country, currentAddress.state).map(
                      (city) => (
                        <SelectItem key={city.name} value={city.name} className={undefined} >
                          {city.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Address & Pincode */}
            <div>
              <label className="text-sm">Address</label>
              <Input
                value={currentAddress.address}
                onChange={(e) => handleChange(e, "current", "address")} className={undefined} type={undefined}              />
            </div>
            <div>
              <label className="text-sm">Pincode</label>
              <Input
                value={currentAddress.pincode}
                onChange={(e) => handleChange(e, "current", "pincode")} className={undefined} type={undefined}              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 mt-4 ">
            <Checkbox className= "border-2"
              checked={sameAsCurrent}
              onCheckedChange={(val) => {
                setSameAsCurrent(val);
                if (val) setPermanentAddress({ ...currentAddress });
              }}
            />
            <label className="text-sm ">
              Permanent address same as current
            </label>
          </div>

          {/* ====== Permanent Address ====== */}
          {!sameAsCurrent && (
            <>
              <h3 className="font-medium text-base">Permanent Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="text-sm">Country</label>
                  <Select
                    value={permanentAddress.country}
                    onValueChange={(val) =>
                      handleSelect(val, "permanent", "country")
                    }
                  >
                    <SelectTrigger className= "w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className={undefined}>
                      <SelectGroup>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode} className={undefined}                           >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div>
                  <label className="text-sm">State</label>
                  <Select
                    value={permanentAddress.state}
                    onValueChange={(val) =>
                      handleSelect(val, "permanent", "state")
                    }
                    disabled={!permanentAddress.country}
                  >
                    <SelectTrigger className= "w-full">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className={undefined}>
                      <SelectGroup>
                        {getStates(permanentAddress.country).map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode} className={undefined} >
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm">City</label>
                  <Select
                    value={permanentAddress.city}
                    onValueChange={(val) =>
                      handleSelect(val, "permanent", "city")
                    }
                    disabled={!permanentAddress.state}
                  >
                    <SelectTrigger className= "w-full">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className={undefined} >
                      <SelectGroup>
                        {getCities(
                          permanentAddress.country,
                          permanentAddress.state
                        ).map((city) => (
                          <SelectItem key={city.name} value={city.name} className={undefined}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Address & Pincode */}
                <div>
                  <label className="text-sm">Address</label>
                  <Input
                    value={permanentAddress.address}
                    onChange={(e) => handleChange(e, "permanent", "address")} className={undefined} type={undefined}                  />
                </div>
                <div>
                  <label className="text-sm">Pincode</label>
                  <Input
                    value={permanentAddress.pincode}
                    onChange={(e) => handleChange(e, "permanent", "pincode")} className={undefined} type={undefined}                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={handleCancel} className={undefined} size={undefined}>
              Cancel
            </Button>
            <Button onClick={handleSave} className={undefined} variant={undefined} size={undefined}>Save Address</Button>
          </div>
        </div>
      ) : (
        addressSaved && (
          <div className="space-y-4 mt-4">
            <div>
              <h4 className="font-medium">Current Address</h4>
              <p>
                {currentAddress.address}, {currentAddress.city},{" "}
                {currentAddress.state}, {currentAddress.country} -{" "}
                {currentAddress.pincode}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Permanent Address</h4>
              <p>
                {permanentAddress.address}, {permanentAddress.city},{" "}
                {permanentAddress.state}, {permanentAddress.country} -{" "}
                {permanentAddress.pincode}
              </p>
            </div>
          </div>
        )
      )}

      {/* Bottom Message */}
      {(!addressSaved || showForm) && (
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Please fill in your address details to complete your profile.
        </p>
      )}
    </Card>
  );
};

export default AddressSection;
