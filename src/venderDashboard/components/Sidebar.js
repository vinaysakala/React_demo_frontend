import React from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';

const Sidebar = ({ visible, onHide, onMenuSelect }) => {
    const items = [
        {
            label: 'Add Firm',
            icon: 'pi pi-building',
            command: () => onMenuSelect && onMenuSelect('addFirm')
        },
        {
            label: 'Add Product',
            icon: 'pi pi-plus',
            command: () => onMenuSelect && onMenuSelect('addProduct')
        },
        {
            label: 'All Products',
            icon: 'pi pi-list',
            command: () => onMenuSelect && onMenuSelect('allProducts')
        },
        {
            label: 'User Details',
            icon: 'pi pi-user',
            command: () => onMenuSelect && onMenuSelect('userDetails')
        }
    ];

    return (
        <PrimeSidebar visible={visible} onHide={onHide} position="left" style={{ width: '18rem' }}>
            <PanelMenu model={items} />
        </PrimeSidebar>
    );
};

export default Sidebar;


