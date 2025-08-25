import React, { useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { API_URL } from '../../data/ApiPath';
import { BlockUI } from 'primereact/blockui';
import { Dropdown } from 'primereact/dropdown';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState([]); // Array for multiple selection
    const [bestSeller, setBestSeller] = useState('No');
    const [description, setDescription] = useState('');
    const [image, setimage] = useState(null);
    const toast = useRef(null);
    const [blocked, setBlocked] = useState(false);
    const [firmId, setFirmId] = useState(null);
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

    const [firms, setFirms] = useState([]);

    const fetchFirms = async () => {
        try {
            const vendor = localStorage.getItem('Vender');
            const venderId = JSON.parse(vendor)?.id;
            const response = await fetch(`${API_URL}firm/getFirms/${venderId}`);
            const data = await response.json();
            if (data.status === 200) {
                setFirms(data.firm);
            }
        } catch (error) {
            console.error('Error fetching firms:', error);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchFirms();
            hasFetched.current = true; // Prevent second call in Strict Mode
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle add product logic here
        if (!productName || !price || !description) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'All fields are required.', life: 1000 });
            return;
        }
        if (!image) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Product image is required.', life: 1000 });
            return;
        }

        const loginToken = localStorage.getItem('token');
        if (!loginToken) {
            toast.current.show({ severity: 'error', summary: 'Login', detail: 'You are not logged in.', life: 1000 });
            return;
        }
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('bestSeller', bestSeller);
        formData.append('description', description);
        category.forEach(cat => formData.append('category[]', cat));
        formData.append('image', image);
        setBlocked(true);

        const response = await fetch(`${API_URL}product/add-product/${firmId}`, {
            method: 'POST',
            headers: {},
            body: formData,
        })
        const result = await response.json();
        if (result.status === 200) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 1000 });
            setProductName('');
            setPrice('');
            setCategory([]);
            setBestSeller('No');
            setDescription('');
            setimage(null);
            setFirmId(null);
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 1000 });
        }
        setBlocked(false);
    };

    return (
        <div className="flex-grow-1 flex justify-content-center align-items-center mt-2" style={{ minHeight: '80vh' }}>
            <Toast ref={toast} />
            <BlockUI blocked={blocked} fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>}></BlockUI>
            <Card title="Add Product" style={{ width: '50rem' }}>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="flex gap-3 mb-1">
                        <div className="field col-6">
                            <label htmlFor="productName" className="block mb-2">Product Name</label>
                            <InputText
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                                placeholder="Enter Product Name"
                            />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="price" className="block mb-2">Price</label>
                            <InputText
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="Enter Price"
                            />
                        </div>
                    </div>
                    <div className='field ml-2'>
                        <label htmlFor="description" className="block mb-2">Firm</label>
                        <Dropdown value={firmId} onChange={(e) => setFirmId(e.value)} options={firms} optionLabel="firmName" optionValue="_id"
                            placeholder="Select Firm" />
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
                            <label htmlFor="nonveg">Non-veg</label>
                        </div>
                    </div>
                    <div className="field mb-3 ml-2">
                        <label htmlFor="bestSeller" className="block mb-2">Best Seller</label>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex align-items-center">
                                <RadioButton inputId="Yes" name="Seller" value="Yes" onChange={(e) => setBestSeller(e.value)} checked={bestSeller === 'Yes'} />
                                <label htmlFor="Yes" className="ml-2">Yes</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="No" name="Seller" value="No" onChange={(e) => setBestSeller(e.value)} checked={bestSeller === 'No'} />
                                <label htmlFor="No" className="ml-2">No</label>
                            </div>
                        </div>

                    </div>
                    <div className="field mb-3 ml-2">
                        <label htmlFor="description" className="block mb-2">Description</label>
                        <InputText
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter Description"
                        />
                    </div>
                    <div className="field mb-3 ml-2">
                        <label htmlFor="image" className="block mb-2">Product Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setimage(e.target.files[0])}
                        />
                    </div>
                    <Button label="Submit" type="submit" className="w-full" />
                </form>
            </Card>
        </div>
    );
};

export default AddProduct;
