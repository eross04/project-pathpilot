import React, {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {LocationTypes} from './LocationTypes.js';
import {TripAttributes} from './TripAttributes.js';
import FetchPathCalculation from './FetchPathCalculation.js';
import Select from 'react-select';

const PlanManualInput = ({ updateLocations, updatePath, updateAdvancedOptions }) => {
    const [selectedTypeLocations, setSelectedTypeLocations] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [costChoice, setCostChoice] = useState(null);
    const [starsChoice, setStarsChoice] = useState(null);
    const [neighborhoodChoice, setNeighborhoodChoice] = useState(null);
    const [locatedNear, setLocatedNear] = useState(null);

    const [advancedOptions, setAdvancedOptions] = useState(false);


    //Get rid of these eventually
    const [path, setPath] = useState(null);
    const [locations, setLocations] = useState(null);

    //For select options
    const cost = [
        { value: '$', label: '$' },
        { value: '$$', label: '$$' },
        { value: '$$$', label: '$$$' }
    ];

    const stars = [
        { value: 1, label: '1 Star' },
        { value: 2, label: '2 Stars' },
        { value: 3, label: '3 Stars' },
        { value: 4, label: '4 Stars' },
        { value: 5, label: '5 Stars' }
    ];

    const neighborhoods = [
        { value: 'bella vista', label: 'Bella Vista' },
        { value: 'callowhill', label: 'Callowhill' },
        { value: 'chinatown', label: 'Chinatown' },
        { value: 'east passyunk', label: 'East Passyunk' },
        { value: 'fairhill', label: 'Fairhill' },
        { value: 'fairmount', label: 'Fairmount' },
        { value: 'fishtown', label: 'Fishtown' },
        { value: 'graduate hospital', label: 'Graduate Hospital' },
        { value: 'logan square', label: 'Logan Square' },
        { value: 'market east', label: 'Market East' },
        { value: 'midtown village', label: 'Midtown Village' },
        { value: 'northern liberties', label: 'Northern Liberties' },
        { value: 'old city', label: 'Old City' },
        { value: 'pennsport', label: 'Pennsport' },
        { value: 'powelton village', label: 'Powelton Village' },
        { value: 'queen village', label: 'Queen Village' },
        { value: 'rittenhouse square', label: 'Rittenhouse Square' },
        { value: 'society hill', label: 'Society Hill' },
        { value: 'spring garden', label: 'Spring Garden' },
        { value: 'spruce hill and cedar park', label: 'Spruce Hill and Cedar Park' },
        { value: 'university city', label: 'University City' },
        { value: 'washington square west', label: 'Washington Square West' },
        { value: 'north broad', label: 'North Broad'}
    ];

    const locatedNearLocations = [
        { value: 'bsl', label: 'BSL Subway Stop'},
        { value: 'msl', label: 'MSL Subway Stop'},
        { value: 'bus', label: 'Bus Stop'},
        { value: 'parking', label: 'Parking Garage'},
        { value: 'trolley', label: 'Trolley Stop'},
        { value: 'regional rail', label: 'Regional Rail Station'}
    ];

    const handleTypeChange = (e) => {
        if(e.target.checked) {
            setSelectedTypeLocations(selectedTypeLocations => [...selectedTypeLocations, e.target.value]);
        } else {
            const index = selectedTypeLocations.indexOf(e.target.value);
            selectedTypeLocations.splice(index,1);
            console.log(selectedTypeLocations);
        }
    }

    const handleAttributeChange = (e) => {
        if(e.target.checked) {
            setSelectedAttributes(selectedAttributes => [...selectedAttributes, e.target.value]);
        } else {
            const index = selectedAttributes.indexOf(e.target.value);
            selectedAttributes.splice(index,1);
            console.log(selectedAttributes);
        }
    }

    const handleAdvanceOptions = () => {
        if(advancedOptions) {
            setAdvancedOptions(false);
            updateAdvancedOptions(false);
        } else {
            setAdvancedOptions(true);
            updateAdvancedOptions(true);
        }
    }

    const SendManualInputToBackend = async () => {
        try {
            const pathData = await FetchPathCalculation(selectedTypeLocations, selectedAttributes, costChoice, starsChoice, neighborhoodChoice, locatedNear);
            pathData.locations ? setLocations(pathData.locations) : console.log("ERROR");
            pathData.path ? setPath(pathData.path) : console.log("ERROR");
        } catch {
            console.log("ERROR")
        }
    }
    console.log(locations);
    console.log(path);
    
    
    return (
        <div className='input-padding'>
            <h2>Where would you like to go?</h2>
            <FormGroup>
            {
                LocationTypes?.map((type) =>
                <div>
                    <FormControlLabel control={<Checkbox value={type.value} onChange={handleTypeChange}/>} label={type.label} />
                    {
                        console.log("Value " + selectedTypeLocations)
                    }
                </div>
                )
            }
            </FormGroup>

            {
                advancedOptions ? 
                    <div>
                        <br></br>
                        <div className='advanced-options-title' onClick={handleAdvanceOptions}>Minimize Advanced Options</div>
                        <h3>Type of trip</h3>
                        <FormGroup>
                        {
                            TripAttributes?.map((attribute) =>
                            <div>
                                <FormControlLabel control={<Checkbox value={attribute.value} onChange={handleAttributeChange}/>} label={attribute.label} />
                                {
                                    console.log("Value " + attribute.value)
                                }
                            </div>
                            )
                        }
                        </FormGroup>
                        <h3>Cost of Locations</h3>
                        <Select
                            className='input-option-select'
                            onChange={choice => setCostChoice(choice.value)}
                            options={cost}
                            placeholder="Select Cost..."
                        />
            
                        <h3>Minimum Number of Stars</h3>
                        <Select
                            className='input-option-select'
                            onChange={choice => setStarsChoice(choice.value)}
                            options={stars}
                            placeholder="Select Stars..."
                        />
            
                        <h3>Preferred Neighborhood</h3>
                        <Select
                            className='input-option-select'
                            onChange={choice => setNeighborhoodChoice(choice.value)}
                            options={neighborhoods}
                            placeholder="Select Neighborhood..."
                        />
            
                        <h3>Located Near A</h3>
                        <Select
                            className='input-option-select'
                            onChange={choice => setLocatedNear(choice.value)}
                            options={locatedNearLocations}
                            placeholder="Select Locations..."
                        />
                    </div>
                : <div className='advanced-options-title' onClick={handleAdvanceOptions}>Advanced Options</div>
            }
            <br></br>
            <div className='submit-button-container'>
                <button className='submit-button' onClick={SendManualInputToBackend}>Submit</button>
            </div>
        </div>
    )
};

export default PlanManualInput;