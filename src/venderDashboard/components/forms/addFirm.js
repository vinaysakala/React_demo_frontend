import React, { useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { API_URL } from '../../data/ApiPath';
import { BlockUI } from 'primereact/blockui';


const AddFirm = () => {
    const [firmName, setFirmName] = useState('');
    const [area, setArea] = useState('');
    const [category, setCategory] = useState([]); // Array for multiple selection
    const [region, setRegion] = useState([]); // Array for multiple selection
    const [offer, setOffer] = useState('');
    const [image, setimage] = useState(null);
    const toast = useRef(null);
    const [blocked, setBlocked] = useState(false);
    const hasFetched = useRef(false);

    const handleCategoryChange = (e) => {
        let selected = [...category];
        if (e.checked) {
            selected.push(e.value);
        } else {
            selected = selected.filter(val => val !== e.value);
        }
        setCategory(selected);
    };

    const handleRegionChange = (e) => {
        let selected = [...region];
        if (e.checked) {
            selected.push(e.value);
        } else {
            selected = selected.filter(val => val !== e.value);
        }
        setRegion(selected);
    };


    // useEffect(() => {
    //     if (!hasFetched.current) {
    //         const loginToken = localStorage.getItem('token');
    //         if (!loginToken) {
    //             toast.current.show({ severity: 'error', summary: 'Login', detail: 'You are not logged in.', life: 1000 });
    //             return;
    //         }
    //         hasFetched.current = true; // Prevent second call in Strict Mode
    //     }
    // }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle add firm logic here
        try {
            const loginToken = localStorage.getItem('token');
            if (!loginToken) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'You must be logged in to add a firm.', life: 1000 });
                return;
            }

            if (!firmName || !area || !offer || !image || category.length === 0 || region.length === 0) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'All fields are required.', life: 1000 });
                return;
            }
            if (!image) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Firm image is required.', life: 1000 });
                return;
            }

            const formData = new FormData();
            formData.append('image', image);
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            category.forEach(cat => formData.append('category[]', cat));
            region.forEach(reg => formData.append('region[]', reg));

            setBlocked(true);
            console.log("Form Data:", formData);
            const response = await fetch(`${API_URL}firm/add-firm`, {
                method: 'POST',
                headers: {
                    'token': `${loginToken}`,
                },
                body: formData
            });
            const result = await response.json();
            if (result.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 1000 });
                setFirmName('');
                setArea('');
                setCategory([]);
                setRegion([]);
                setOffer('');
                setimage(null);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 1000 });
            }
        } catch (error) {
            setBlocked(false);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add firm.', life: 1000 });
            console.error("Error adding firm:", error);
        }
        setBlocked(false);
    };

    return (
        <div className="flex-grow-1 flex justify-content-center align-items-center mt-6" style={{ minHeight: '80vh' }}>
            <BlockUI blocked={blocked} fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>}></BlockUI>
            <Toast ref={toast} />
            <Card title="Add Firm" style={{ width: '30rem' }}>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="flex gap-3 mb-1">
                        <div className="field col-6">
                            <label htmlFor="firmName" className="block mb-2">Firm Name</label>
                            <InputText
                                id="firmName"
                                value={firmName}
                                onChange={(e) => setFirmName(e.target.value)}
                                required
                                placeholder="Enter Firm Name"
                            />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="area" className="block mb-2">Area</label>
                            <InputText
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                                placeholder="Enter Area"
                            />
                        </div>
                    </div>
                    <div className="field mb-3 ml-2">
                        <label className="block mb-2">Category</label>
                        <div className="flex gap-3">
                            <Checkbox
                                inputId="veg"
                                value="Veg"
                                checked={category.includes('Veg')}
                                onChange={handleCategoryChange}
                            />
                            <label htmlFor="veg" className="mr-4">Veg</label>
                            <Checkbox
                                inputId="nonveg"
                                value="non-veg"
                                checked={category.includes('non-veg')}
                                onChange={handleCategoryChange}
                            />
                            <label htmlFor="nonveg">Nonveg</label>
                        </div>
                    </div>
                    <div className="field mb-3 ml-2">
                        <label className="block mb-2">Region</label>
                        <div className="flex gap-3 flex-wrap">
                            <Checkbox
                                inputId="north-indian"
                                value="north-indian"
                                checked={region.includes('north-indian')}
                                onChange={handleRegionChange}
                            />
                            <label htmlFor="north-indian" className="mr-3">North-Indian</label>
                            <Checkbox
                                inputId="south-indian"
                                value="South-indian"
                                checked={region.includes('South-indian')}
                                onChange={handleRegionChange}
                            />
                            <label htmlFor="south-indian" className="mr-3">South-Indian</label>
                            <Checkbox
                                inputId="chinese"
                                value="chinese"
                                checked={region.includes('chinese')}
                                onChange={handleRegionChange}
                            />
                            <label htmlFor="chinese" className="mr-3">Chinese</label>
                            <Checkbox
                                inputId="bakery"
                                value="bakery"
                                checked={region.includes('bakery')}
                                onChange={handleRegionChange}
                            />
                            <label htmlFor="bakery">Bakery</label>
                        </div>
                    </div>
                    <div className="field mb-3 ml-1">
                        <label htmlFor="offer" className="block mb-2">Offer</label>
                        <InputText
                            id="offer"
                            value={offer}
                            onChange={(e) => setOffer(e.target.value)}
                            required
                            placeholder="Enter Offer"
                        />
                    </div>
                    <div className="field mb-3 ml-1">
                        <label htmlFor="image" className="block mb-2">Firm Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setimage(e.target.files[0])}
                        />

                        {/* <FileUpload
                            mode="basic"
                            name="image"
                            accept="image/*"
                            maxFileSize={1000000}
                            customUpload
                            auto
                            onSelect={(e) => {
                                if (e.files && e.files.length > 0) {
                                    setimage(e.files[0]); // same as your original onChange
                                }
                            }}
                        /> */}


                    </div>
                    <Button label="Submit" type="submit" className="w-full" />
                </form>
            </Card>
        </div>
    );
};

export default AddFirm;