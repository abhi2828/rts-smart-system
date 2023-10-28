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

export default function VendorDetailsModal({
  open = true,
  data,
  setVendorDetailsModalNo,
}: {
  open: boolean;
  data: any;
  setVendorDetailsModalNo: (prNo: string | null) => void;
}) {
  const handleClose = () => {
    setVendorDetailsModalNo(null);
  };

  if (data === null) {
    return <div></div>;
  }

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
              VENDOR LIST
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='tw-mx-[5rem] tw-mt-8 tw-flex tw-gap-[2rem]'>
          <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
            <div className=' tw-text-2xl'>TOTAL ITEMS</div>
            <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
              {data.length}
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
                    INDUSTRY
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ADDRESS ID
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ADDRESS2
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ADDRESS3
                  </StyledTableCell>

                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    CITY
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ZIP CODE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    COUNTRY
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    STATE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    TELEPHONE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    FAX
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    EMAIL
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    CURRENCY
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BANK COUNTRY
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BANK NAME
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BANK CODE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ACCOUNT
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BICSWIFT CODE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BANK ACCOUNT NAME
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    BRANCH
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    IBAN
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className=' !tw-text-black'>
                {data.map((row: any) => (
                  <StyledTableRow key={row.item_master}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      className='!tw-font-bold !tw-underline tw-whitespace-nowrap'
                    >
                      {row.Industry}
                    </StyledTableCell>

                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.AddressID}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.AddressName2}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.AddressName3}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.City}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.ZipCode}
                    </StyledTableCell>

                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.Country}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.State}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Telephone}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.Fax}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row.Email}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Currency}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.BankCountry}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.BankName}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.BankCode}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Account}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.BICSWIFTCode}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.BankAccountName}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.Branch}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row.IBAN}
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
