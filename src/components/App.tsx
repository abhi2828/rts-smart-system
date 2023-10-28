import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import Header from '@/components/Header';

import Footer from './Footer';

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

function createData(
  item_no: string,
  item_group: string,
  foreign_name: string,
  location: string,
  cost_center: string,
  description: string,
  serial_no: string,
  status: string
) {
  return {
    item_no,
    item_group,
    foreign_name,
    location,
    cost_center,
    description,
    serial_no,
    status,
  };
}

const getDataFromStorage = () => {
  return JSON.parse(window.localStorage.getItem('app') as string);
};

const rows = getDataFromStorage().map((d: Array<string>) => {
  //@ts-ignore
  createData(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7]);
});

const Home = () => {
  return (
    <>
      <Header />
      <section className='tw-bg-[#F4f4f4]'>
        <div className='tw-flex tw-items-center tw-bg-primary tw-px-[18vw] tw-py-[2rem]'>
          <div className='tw-text-white'>
            <ChevronLeftIcon
              fill='white'
              className='tw-min-h-[5rem] tw-min-w-[5rem]'
            />
          </div>
          <div className='tw-flex tw-items-center tw-text-3xl tw-text-white'>
            ASSET MASTER
          </div>
        </div>
        <Card className='tw-mx-[18vw] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>ASSET MASTER</span>
              <span className='tw-mt-4 tw-text-gray-400'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                perspiciatis inventore modi ut omnis minus dignissimos placeat,
                et, rerum labore iste! Porro architecto esse magni consectetur
                aspernatur ipsum minus quae!
              </span>
            </div>
            <div className='tw-items-start tw-justify-start'>
              <DownloadIcon
                fill='black'
                className='tw-min-h-[4rem] tw-min-w-[4rem]'
              />
            </div>
          </div>
          <div className='tw-mt-5 tw-flex  tw-justify-center tw-gap-[2rem]'>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-2 tw-py-2 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                Age
              </FormLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={20}
                label='Status'
                onChange={() => {}}
              >
                <MenuItem value={10}>ALL</MenuItem>
                <MenuItem value={20}>ALL</MenuItem>
                <MenuItem value={30}>ALL</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                {' '}
                Date
              </FormLabel>
              <DateRangePicker
                className='tw-grow tw-basis-1/3'
                label='Data'
                slots={{ field: SingleInputDateRangeField }}
              />
            </FormControl>

            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 !tw-text-sm !tw-text-gray-900'
                id='demo-simple-select-label'
              >
                {' '}
                Quick Search
              </FormLabel>
              <TextField
                fullWidth
                className='tw-block tw-grow tw-basis-1/3'
                name='email'
                variant='outlined'
                placeholder='Country | Email | Phone'
              />
            </FormControl>
          </div>
          <div className='tw-mt-8 tw-flex tw-gap-[2rem]'>
            <div className=' tw-flex tw-flex-col tw-justify-items-start tw-rounded-lg tw-bg-primary  tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>Total No of Assets</div>
              <div className='tw-text-4xl tw-font-bold'>2010</div>
            </div>
            <div className=' tw-flex tw-flex-col tw-justify-items-start  tw-rounded-lg tw-bg-primary tw-p-4 tw-text-white'>
              <div className=' tw-text-2xl'>Total No of Locations</div>
              <div className='tw-text-4xl tw-font-bold'>10</div>
            </div>
          </div>
          <div style={{ width: '100%' }} className='tw-my-10'>
            <TableContainer component={Paper} className='!tw-rounded-2xl'>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ITEM NO</StyledTableCell>
                    <StyledTableCell align='center'>
                      ITEM GROUP{' '}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      FOREIGN NAME
                    </StyledTableCell>
                    <StyledTableCell align='center'>LOCATION</StyledTableCell>
                    <StyledTableCell align='center'>
                      COST CENTER
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      DESCRIPTION
                    </StyledTableCell>
                    <StyledTableCell align='center'>SERIAL NO</StyledTableCell>
                    <StyledTableCell align='center'>STATUS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody className=' !tw-text-black'>
                  {rows.map((row: any) => (
                    <StyledTableRow key={row.item_no}>
                      <StyledTableCell
                        component='th'
                        scope='row'
                        className='!tw-font-bold !tw-underline'
                      >
                        <Checkbox
                          color='primary'
                          checked={false}
                          onChange={() => {}}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                        {row.item_no}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.foreign_name}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.location}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.cost_center}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.serial_no}
                      </StyledTableCell>
                      <StyledTableCell className='!tw-font-bold' align='center'>
                        {row.serial_no}
                      </StyledTableCell>

                      <StyledTableCell className='!tw-font-bold' align='center'>
                        <div className='tw-flex tw-items-center tw-justify-center tw-gap-3'>
                          {row.status}
                          <MoreVertIcon className='!tw-h-[2rem] !tw-w-[2rem]' />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    count={rows.length}
                    rowsPerPage={5}
                    page={1}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={() => {}}
                    onRowsPerPageChange={() => {}}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </Card>
      </section>
      <Footer className='tw-mt-10' />
    </>
  );
};

export default Home;
