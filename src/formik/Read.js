import React, { useEffect, useState,useRef } from 'react'; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import axios from 'axios';
import { API_URL } from '../Api/URL';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
// import { FilterMatchMode } from "primereact/api";




const Read = () => {

  const [userdata, setUserData] = useState([]); //store data
  const [selectedProducts,setSelectedProducts] = useState([]) //All selection
  const toast = useRef(null);
  // const [selectuser,setSelectedUsers] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false); 
  const Navigate = useNavigate()
  const [globalfilter,setGlobalfilter] = useState(null)
  const searchInputRef = useRef(null);
  const dt = useRef(null);

  const emptyData = {
    username: "",
    email: "",
    dob: "",
    password: "",
    cpassword: "",
    mobile: "",
    nationality: "",
    gender: "",
    languages: [],
  };
  const [product, setProduct] = useState(emptyData);
  
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
   
  };
   const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
  const deleteProduct = () => {
    let _products = userdata.filter((val) => val.id !== product.id);
    setUserData(_products);

    setDeleteProductDialog(false);
    // setProduct(emptyData);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "You have Deleted",
      life: 3000,
    });
  };
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        className="me-2 rounded"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        className="rounded"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

//store data
const fetchData = async () => {
  const ress = await axios.get(API_URL);
  setUserData(ress.data)

};

useEffect(()=>{
  fetchData()
},[])


//open new form
  const openNew = () => {
    Navigate('/');
  }


  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

    const updatedata = (data) => {
    localStorage.setItem('id',data.id)
    localStorage.setItem('username',data.username)
    localStorage.setItem('email',data.email)
    localStorage.setItem("number", data.number);
    localStorage.setItem("password", data.password);
    localStorage.setItem("cpassword", data.cpassword);
    localStorage.setItem("gender", data.gender);
    localStorage.setItem("nationality", data.nationality);
    localStorage.setItem("dob", data.dob);
    localStorage.setItem("languages", data.languages);
      Navigate('/update');
    }
    
   const deleteSelectedProducts = () => {
    let _products = userdata.filter((val) => !selectedProducts.includes(val));
    setUserData(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]); // Clear selected products after deletion
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'You have deleted selected items',
      life: 3000,
    });
  };
const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times"  className="me-2 rounded selectproductsno" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="me-2 rounded selectproductsyes" outlined severity="danger"  onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
const clear = () => {
  setGlobalfilter(null)
  if (searchInputRef.current) {
    searchInputRef.current.value = ''; // Clear the value in the search input
  }
}

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };
    const exportExcel = () => {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(userdata);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer = xlsx.write(workbook, {
              bookType: 'xlsx',
              type: 'array'
          });

          saveAsExcelFile(excelBuffer, 'userdata');
      });
  };
  
  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
        if (module && module.default) {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });

            module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
    });
};

const exportPdf = () => {
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);

          doc.autoTable({
           head:[['Name','Email','DOB','Gender','Number']],
           body:userdata.map(({username,email,dob,gender,number})=>[username,email,dob,gender,number])
          });
          doc.save('Userdata.pdf');
      });
  });
};
  return (
  <div className='container-fluid'>
    <div className='card car' >
      <div>
        <Button label="New" icon="pi pi-plus" severity="success" style={{ borderRadius: "5px"}} onClick={openNew} /> 
        <Button label="Delete" icon="pi pi-trash" severity="danger"  style={{ borderRadius: "5px", marginLeft:'10px'}} onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length}/> 
        
        <div style={{float:"inline-end"}}>
          <Button type="button" icon="pi pi-file" data-pr-tooltip="CSV" style={{ borderRadius: "25px"}} onClick={() => exportCSV(false)} />   {/* onClick={() => exportCSV(false)} */}
          <Button type="button" icon="pi pi-file-excel" severity="success"  data-pr-tooltip="XLS" style={{ borderRadius: "25px"}}   onClick={exportExcel} />   
          <Button type="button" icon="pi pi-file-pdf" severity="warning" data-pr-tooltip="PDF" style={{ borderRadius: "25px"}} onClick={exportPdf}/>  
        </div>
      </div>
    </div>
  
    <div className='card'>  
      <div className='card-header d-flex' style={{justifyContent:'space-between'}}>
        <h3>User List </h3>
        <Button  severity="primary" outlined style={{ borderRadius: "5px"}} onClick={clear}>
             <i className="pi pi-filter-slash" style={{ fontSize: '1rem',paddingRight:'10px' }}></i> <b>Clear</b> 
        </Button>
        <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"  />
                    <InputText  placeholder="Keyword Search" type='search' onInput={(e)=>setGlobalfilter(e.target.value)} 
                           ref={searchInputRef}       /> 
        </IconField>
      </div>
   
      <div className="card-body p-0">
        <DataTable value={userdata}  filterDisplay="row" dataKey="id" paginator  rowsPerPageOptions={[5,10,15]} globalFilter={globalfilter} ref={dt}
          rows={10} selectionMode="checkbox" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}  >
            <Column  selectionMode="multiple" headerStyle={{ width: '1rem' }} />
            <Column field="username" sortable  header="Name" filter filterPlaceholder="Search"  />
            <Column field="number" sortable header="Phonenumber"  filter filterPlaceholder="Search"  />
            <Column field="email" sortable header="Email"   filter filterPlaceholder="Search"/>
            <Column field="dob" sortable header="DOB"  filter filterPlaceholder="Search" />
            <Column field="gender" sortable header="Gender"   filter filterPlaceholder="Search" />
            <Column  header="Action" body={(rowData)=> 
              <div className="d-flex gap-3">
                <Button icon="pi pi-pencil"
                        outlined
                        className="mr-2 suba1" 
                        style={{borderRadius:'25px'}}   
                        onClick={() => updatedata(rowData)} 
                />
                <Button icon="pi pi-trash"
                        outlined
                        severity="danger suba2" 
                        style={{borderRadius:'25px'}} 
                       
                        onClick={() => {
                          confirmDeleteProduct(rowData);
                          setSelectedProducts([rowData]); /*setSelectedUsers([rowData]) */
                        }}
                      
                />
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span style={{marginLeft:'10px'}}>
                            Are you sure you want to delete <b>{product.username}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
                 <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span style={{marginLeft:'10px'}}>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>         
              </div>}
            />
        </DataTable>
        <Toast ref={toast} />
      </div>
    </div>
  </div>
  )
}

export default Read