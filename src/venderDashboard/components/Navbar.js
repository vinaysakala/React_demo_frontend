import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';


const Navbar = () => {
  const op = useRef(null);
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const items = [
    {
      label: 'Vender',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Add Product',
          icon: 'pi pi-box',
          url: '/dashboard/addProduct'
        },
        {
          label: 'Add Firm',
          icon: 'pi pi-building',
          url: '/dashboard/addFirm'
        },
        {
          label: 'All Products',
          icon: 'pi pi-receipt',
          url: '/dashboard/products'
        }
      ]
    }
  ];

  useEffect(() => {
    const vender = JSON.parse(localStorage.getItem('Vender'));
    if (vender) {
      setUsername(vender.username);
    }
  }, []);

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Vender');
    navigate('/')
  }

  const onMenuClick = () => {
    setVisible(!visible);
  }


  return (
    <div className='navsection flex justify-content-between align-items-center px-4 py-2'>
      <div className='flex'>
        <button className="p-button p-button-text pi pi-bars" onClick={onMenuClick} style={{ fontSize: '1.5rem', marginRight: '1rem', color: '#fff' }} />
        <div className='company font-bold text-xl mt-2'>
          Smart Market Dashboard
        </div>
      </div>
      <div className='userAuth flex gap-3'>
        <Button icon="pi pi-check" rounded className='bg-white font-semibold' onClick={(e) => op.current.toggle(e)} />
      </div>


      <OverlayPanel ref={op}>
        <div className='felx jsustify-content-between align-items-center gap-5 p-1'>
          <div className='flex align-items-center justify-content-center'>
            <span className='text-lg  mb-3'>{username}</span>
          </div>
          <div className='flex gap-4'>
            <Button label="Change password" outlined />
            <Button label="Sign Out" outlined onClick={onLogoutClick} severity="danger" />
          </div>
        </div>
      </OverlayPanel>

      <Sidebar visible={visible} onHide={() => setVisible(false)} position="left">
        <PanelMenu model={items} className="w-full md:w-18rem" />
      </Sidebar>
    </div>
  );
};

export default Navbar;
