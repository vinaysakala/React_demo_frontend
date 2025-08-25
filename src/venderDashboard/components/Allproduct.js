import React, { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { API_URL } from '../data/ApiPath';
import { BlockUI } from 'primereact/blockui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

const Allproduct = () => {
  const [products, setproducts] = useState([]);
  const toast = useRef(null);
  const [blocked, setBlocked] = useState(false);


  const imageBodyTemplate = (product) => {
    return <img src={`${API_URL}uploads/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
  };

  const deleteRow = (product) => {
    return (
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(product._id)} />
    );
  };


  const handleDelete = async (productId) => {
    try {
      setBlocked(true);
      const response = await fetch(`${API_URL}product/delete/${productId}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully', life: 1000 });
        getallproducts();
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete product', life: 1000 });
      }
      setBlocked(false);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  const getallproducts = async () => {
    try {
      setBlocked(true);
      const response = await fetch(`${API_URL}product/all-products`);
      const data = await response.json();
      if (data.status === 200) {
        console.log(data, 'all products');
        setproducts(data.products);
      }
      setBlocked(false);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    getallproducts();
  }, [])

  return (
    <div>
      <Toast ref={toast} />
      <BlockUI blocked={blocked} fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>}></BlockUI>
      <div className="card">
        <DataTable value={products} showGridlines scrollable scrollHeight="640px" style={{ minWidth: '50rem' }} >
          <Column field="firmName" filter filterPlaceholder="Search by Restaurant" header="Restaurant Name" sortable></Column>
          <Column field="productName" filter filterPlaceholder="Search by Item" header="Item Name" sortable></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="price" header="Price" filter filterPlaceholder="Search by Price" sortable></Column>
          <Column field="description" header="Description" filter filterPlaceholder="Search by Description" sortable></Column>
          <Column field="bestSeller" header="Best Seller" filter filterPlaceholder="Search by Best Seller" sortable></Column>
          <Column style={{ flex: '0 0 4rem' }} body={deleteRow} header="Action"></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default Allproduct
