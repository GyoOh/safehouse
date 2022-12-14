import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";
import { TextField } from '@mui/material';
import Autocomplete from '../Autocomplete';


export default function FormAddressDetail({ formData, setFormData, state, setState }) {


  const addressAry = state.address.split(",")


  const handleChange = address => {
    setState({ address });
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setFormData({ ...formData, lat: latLng.lat, lng: latLng.lng }))
      .catch(error => console.error("Error", error));
  };

  console.log(formData)

  return (
    <div>
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}&libraries=places`}
      ></Script>
      <form className='flex flex-col justify-center'>
        <FormControl>
          <label htmlFor="addressLine1" className='text-[#f5f5f5] text-[18px]'>Address Line 1</label>
          <PlacesAutocomplete
            value={state.address.split(",")[0]}
            onChange={address => {
              setFormData({ ...formData, addressLine1: state.address.split(",")[0] })
              setState({ address })
            }}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className='pb-6'>
                <TextField
                  sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    marginTop: '10px',
                    minWidth: '100%',
                  }}
                  {...getInputProps({
                  })}
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  variant='outlined'
                  placeholder='Address Line 1'
                  required
                />

                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    // console.log(suggestion);
                    // setHome({ ...home, address: suggestion.description });
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        key={suggestion.description}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span
                          onClick={e => {
                            setState({ address: e.currentTarget.innerHTML })
                          }
                          }
                        >
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
            }
          </PlacesAutocomplete >
        </FormControl>

        <FormControl>
          <label htmlFor="addressLine2" className='text-[#f5f5f5] text-[18px]'>Address Line 2</label>
          <div className='pb-6'>
            <TextField
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                marginTop: '10px',
                minWidth: '100%',
              }}
              type="text"
              name="addressLine2"
              id="addressLine2"
              placeholder='Optional'
              variant='outlined'
              value={formData.addressLine2}
              onChange={(e) =>
                setFormData({ ...formData, addressLine2: e.target.value })
              }
            />
          </div>
        </FormControl>

        <FormControl>
          <label htmlFor="city" className='text-[#f5f5f5] text-[18px]'>City</label>
          <div className='pb-6'>
            <TextField
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                marginTop: '10px',
                minWidth: '100%',
              }}
              type="text"
              name="city"
              id="city"
              variant='outlined'
              placeholder='City'
              required
              value={addressAry[addressAry.length - 3] ? addressAry[addressAry.length - 3] : formData.city}
              onChange={(e) => {
                console.log(e.target.value)
                setFormData({ ...formData, city: e.target.value })
              }}
            />
          </div>
        </FormControl>
        <FormControl>
          <label htmlFor="city" className='text-[#f5f5f5] text-[18px]'>Province</label>
          <div className='pb-6'>
            <TextField
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                marginTop: '10px',
                minWidth: '100%',
              }}
              type="text"
              name="province"
              id="province"
              variant='outlined'
              placeholder='Province'
              required
              value={addressAry[addressAry.length - 2] ? addressAry[addressAry.length - 2].split(" ")[0] : formData.province}
              onChange={(e) => {
                console.log(e.target.value)
                setFormData({ ...formData, province: e.target.value })
              }}
            />
          </div>
        </FormControl>
        {/* <FormControl>
          <label htmlFor="province">Province</label>
          <select
            name="province"
            id="province"
            value={formData.province}
            onChange={(e) =>
              setFormData({ ...formData, province: e.target.value })
            }
          >
            <option value="British Columbia">British Columbia</option>
            <option value="Alberta">Alberta</option>
            <option value="Manitoba">Manitoba</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Ontario">Ontario</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Quebec">Quebec</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Yukon">Yukon</option>
          </select>
        </FormControl> */}
        <FormControl>
          <label htmlFor="postalCode" className='text-[#f5f5f5] text-[18px]'>Postal Code</label>
          <div className='pb-6'>
            <TextField
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                marginTop: '10px',
                minWidth: '100%',
              }}
              type="text"
              name="postalCode"
              id="postalCode"
              variant='outlined'
              placeholder='Postal Code'
              required
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              onSelect={() => setFormData({
                ...formData,
                addressLine1: addressAry[0] ? addressAry[0] : state.address,
                city: addressAry[addressAry.length - 3] ? addressAry[addressAry.length - 3] : formData.city,
                province: addressAry[addressAry.length - 2] ? addressAry[addressAry.length - 2] : formData.province
              })}
            />
          </div>
        </FormControl>


      </form >


    </div >
  )
}
