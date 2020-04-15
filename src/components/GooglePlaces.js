import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
 
const Component = () => (
  <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
    />
  </div>
);
 
export default Component;