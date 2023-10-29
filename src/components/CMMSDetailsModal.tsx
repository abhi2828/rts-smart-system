import { CmmsTypeObject } from '@/utils/DataTypes';
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

export default function CMMSDetailsModal({
  open = true,
  data,
  setCMMSDetailsModalNo,
}: {
  open: boolean;
  data: CmmsTypeObject | '';
  setCMMSDetailsModalNo: (prNo: string | null) => void;
}) {

  console.log('data',data)

  const handleClose = () => {
    setCMMSDetailsModalNo(null);
  };

  if (data === null) {
    return <div></div>;
  }

  let dataToShow = [data];

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
              CMMS ITEM LIST
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='tw-mx-[5rem] tw-mt-8 tw-flex tw-gap-[2rem]'>
          <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
            <div className=' tw-text-2xl'>TOTAL ITEMS</div>
            <div className='tw-mt-2 tw-text-4xl tw-font-bold'>
              {dataToShow.length}
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
                    MANUFACTURER
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    CAPITALISATION DATE
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    PREFERRED VENDOR
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    UOM NAME
                  </StyledTableCell>

                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ASSET GROUP
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    className='tw-whitespace-nowrap'
                  >
                    ASSET CLASS
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
                  {/* <StyledTableCell
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
                  </StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody className=' !tw-text-black'>
                {dataToShow.map((row: any) => (
                  <StyledTableRow key={row?.item_master}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      className='!tw-font-bold !tw-underline tw-whitespace-nowrap'
                    >
                      {row?.manufacturer ? row?.manufacturer : '-'}
                    </StyledTableCell>

                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.capitalization_date? row?.capitalization_date : '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.preferred_vendor ? row?.preferred_vendor:'-'}
                    </StyledTableCell>
                    
                    
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.uom_name ? row?.uom_name : '-'}
                    </StyledTableCell>

                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.asset_group ? row?.asset_group : '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.asset_class ? row?.asset_class : '-'}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.remarks ? row?.remarks : '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.attachments ? row?.attachments : '-'}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.warranty_period ? row?.warranty_period : '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.warranty_start_date ? row?.warranty_start_date : '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      className='!tw-font-bold tw-whitespace-nowrap'
                      align='center'
                    >
                      {row?.warranty_end_date ? row?.warranty_end_date : '-'}
                    </StyledTableCell>
                    {/* <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.Currency}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.BankCountry}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.BankName}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.BankCode}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.Account}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.BICSWIFTCode}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.BankAccountName}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.Branch}
                    </StyledTableCell>
                    <StyledTableCell className='!tw-font-bold ' align='center'>
                      {row?.IBAN}
                    </StyledTableCell> */}
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
