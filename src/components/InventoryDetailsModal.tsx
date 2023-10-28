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

export default function InventoryDetailsModal({
  open = true,
  itemNo,
  setInventoryDetailsModalNo,
}: {
  open: boolean;
  itemNo: string;
  setInventoryDetailsModalNo: (itemNO: string | null) => void;
}) {
  const handleClose = () => {
    setInventoryDetailsModalNo(null);
  };

  const [itemDetails, setItemDetails] = React.useState<any>(null);

  React.useEffect(() => {
    if (itemNo !== null && itemNo !== '') {
      (async () => {
        const data1 = await axios.get(
          'https://stgrtsapi.clienttech.dev/api/CMMS/get-inventory-issue-line/' +
            itemNo
        );

        setItemDetails(data1.data.data);
      })();
    }
  }, [itemNo]);

  if (itemDetails === null) {
    return <div></div>;
  }

  const itemDetailsFirst = [itemDetails];

  return (
    <div>
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

        <div className='tw-mx-[5rem] tw-mt-8 tw-flex tw-gap-[2rem]'>
          <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
            <div className=' tw-text-2xl'>TOTAL ITEMS</div>
            <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
              {itemDetailsFirst.length}
            </div>
          </div>
        </div>
        <div className='tw-mx-[5rem] tw-my-10 tw-max-w-[1800px] '>
          <TableContainer
            component={Paper}
            className='!tw-rounded-2xl tw-text-base'
          >
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
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
                {itemDetailsFirst.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      className='tw-whitespace-nowrap !tw-font-bold !tw-underline'
                    >
                      {row.item_no}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell
                      className='tw-whitespace-nowrap !tw-font-bold'
                      align='center'
                    >
                      {row.warehouse}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.uom_code}
                    </StyledTableCell>
                    <StyledTableCell
                      className='tw-whitespace-nowrap !tw-font-bold'
                      align='center'
                    >
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.user_name}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
}
