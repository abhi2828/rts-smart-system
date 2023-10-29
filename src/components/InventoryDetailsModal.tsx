import CloseIcon from '@mui/icons-material/Close';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
// import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import type { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});




const NewInventoryTabel = ({itemNo}:any)=> {
  console.log('abhay', itemNo)
  return  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
  <TableHead>
    <TableRow>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        SERIAL NUMBERS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        MANUFACTURER
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PREFFRED VENDOR
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        REQ PURCHASE UOM
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        INVENTORY LEVEL MAX
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        COST CENTER
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY PERIOD
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY START DATE
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY END DATE
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PACKING UOM NAME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PURCHASE UOM NAME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        LEAD TIME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        HAZARDOUS MATERIAL
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        REMARKS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        ATTACHMENTS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PART NO
      </StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody className=' !tw-text-black'>
    {[itemNo]?.map((row:any, index:any) => (
      console.log('itemNo', itemNo),
      <StyledTableRow key={index}>
        <StyledTableCell
          component='th'
          scope='row'
          className='tw-whitespace-nowrap !tw-font-bold !tw-underline'
        >
          {row?.serial_numbers ? row?.serial_numbers : <center className='tw-mx-auto'>-</center>}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.manufacturer ? row?.manufacturer : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap !tw-font-bold'
          align='center'
        >
          {row?.preferred_vendor ? row?.preferred_vendor : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.required_purchase_uom ? row?.required_purchase_uom : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap !tw-font-bold'
          align='center'
        >
          {row?.inventory_level_max ? row?.inventory_level_max : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.cost_center ? row?.cost_center : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_period ? row?.warranty_period : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_start_date ? row?.warranty_start_date : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_end_date ? row?.warranty_end_date : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.packaging_uom_name ? row?.packaging_uom_name : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.purchase_uom_name ? row?.purchase_uom_name : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.lead_time ? row?.lead_time : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.hazardous_material ? row?.hazardous_material : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.remarks ? row?.remarks : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.attachments ? row?.attachments : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.part_no ? row?.part_no : '-'}
        </StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
}

const ReceiveInventoryTabel = ({itemNo}:any)=> {
  return  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
  <TableHead>
    <TableRow>
    <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
       item no
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        description
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        distr rule
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        gl code
      </StyledTableCell>
  
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        item cost
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        item no
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        number
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
      quantity
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
        style={{width:'150px'}}
      > 
       remarks
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
       total
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        unit price
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
       uom code
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        user name
      </StyledTableCell>

      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        warehouse
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap tw-uppercase'
      >
        whs code
      </StyledTableCell>



    </TableRow>
  </TableHead>
  <TableBody className=' !tw-text-black'>
    {[itemNo]?.map((row:any, index:any) => (
      <StyledTableRow key={index}>
        <StyledTableCell
          component='th'
          scope='row'
          className='tw-whitespace-nowrap tw-uppercase !tw-font-bold !tw-underline'
        >
          {row?.item_no ? row?.item_no : <center className='tw-mx-auto'>-</center>}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.description ? row?.description : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap tw-uppercase !tw-font-bold'
          align='center'
        >
          {row?.distr_rule ? row?.distr_rule : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.gl_code ? row?.gl_code : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap tw-uppercase !tw-font-bold'
          align='center'
        >
          {row?.item_cost ? row?.item_cost : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.item_no ? row?.item_no : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.number ? row?.number : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.quantity ? row?.quantity : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' style={{width:'150px'}} align='center'>
          {row?.remarks ? row?.remarks : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.total ? row?.total : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.unit_price ? row?.unit_price : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.uom_code ? row?.uom_code : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.user_name ? row?.user_name : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warehouse ? row?.warehouse : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.whs_code ? row?.whs_code : '-'}
        </StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
}

const IssueInventoryTabel = ({itemNo}:any)=> {
  return  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
  <TableHead>
    <TableRow>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        SERIAL NUMBERS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        MANUFACTURER
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PREFFRED VENDOR
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        REQ PURCHASE UOM
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        INVENTORY LEVEL MAX
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        COST CENTER
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY PERIOD
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY START DATE
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        WARRANTY END DATE
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PACKING UOM NAME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PURCHASE UOM NAME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        LEAD TIME
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        HAZARDOUS MATERIAL
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        REMARKS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        ATTACHMENTS
      </StyledTableCell>
      <StyledTableCell
        align='center'
        className='tw-whitespace-nowrap'
      >
        PART NO
      </StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody className=' !tw-text-black'>
    {[itemNo]?.map((row:any, index:any) => (
      <StyledTableRow key={index}>
        <StyledTableCell
          component='th'
          scope='row'
          className='tw-whitespace-nowrap !tw-font-bold !tw-underline'
        >
          {row?.serial_numbers ? row?.serial_numbers : <center className='tw-mx-auto'>-</center>}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.manufacturer ? row?.manufacturer : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap !tw-font-bold'
          align='center'
        >
          {row?.preferred_vendor ? row?.preferred_vendor : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.required_purchase_uom ? row?.required_purchase_uom : '-'}
        </StyledTableCell>
        <StyledTableCell
          className='tw-whitespace-nowrap !tw-font-bold'
          align='center'
        >
          {row?.inventory_level_max ? row?.inventory_level_max : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.cost_center ? row?.cost_center : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_period ? row?.warranty_period : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_start_date ? row?.warranty_start_date : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.warranty_end_date ? row?.warranty_end_date : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.packaging_uom_name ? row?.packaging_uom_name : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.purchase_uom_name ? row?.purchase_uom_name : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.lead_time ? row?.lead_time : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.hazardous_material ? row?.hazardous_material : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.remarks ? row?.remarks : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.attachments ? row?.attachments : '-'}
        </StyledTableCell>
        <StyledTableCell className='!tw-font-bold ' align='center'>
          {row?.part_no ? row?.part_no : '-'}
        </StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>
}






export default function InventoryDetailsModal({
  open,
  itemNo,
  inventoryDetails,
  inventoryType,
  setInventoryDetailsModalNo,
}: {
  open: boolean;
  itemNo: any | '' ;
  inventoryDetails:any;
  inventoryType:string;
  setInventoryDetailsModalNo: (itemNO: string | null) => void;
}) {


console.log('itemNo',itemNo);



  const handleClose = () => {
    setInventoryDetailsModalNo(null);
  };

  // const [itemDetails, setItemDetails] = React.useState<any>(null);


  if (open == true) {
    return <div>
       <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              INVENTORY ITEM LIST
            </Typography>
          </Toolbar>
        </AppBar>


        <div className='tw-mx-[5rem] tw-my-10 tw-max-w-[1800px] '>
          <TableContainer
            component={Paper}
            className='!tw-rounded-2xl tw-text-base'
          >
           {
            inventoryType === 'receive' ? <ReceiveInventoryTabel itemNo={itemNo} /> : 
            inventoryType === 'issue' ? <IssueInventoryTabel itemNo={itemNo} /> : 
            inventoryType === 'return' ? <NewInventoryTabel itemNo={itemNo} /> : 
            <NewInventoryTabel itemNo={itemNo} />

           }
          </TableContainer>
        </div>
      </Dialog>
    </div>;
  }
  else {
    return <div></div>;
  }

}


