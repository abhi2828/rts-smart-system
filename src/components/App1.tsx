import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Card,
  FormControl,
  FormLabel,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

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
  source1: string,
  value1: string,
  destination1: string,
  value2: string,
  status1: string
) {
  return {
    source1,
    value1,
    destination1,
    value2,
    status1,
  };
}

const getDataFromStorage = () => {
  return JSON.parse(window.localStorage.getItem('app1') as string);
};

const rows = getDataFromStorage().map((d: Array<string>) => {
  //@ts-ignore
  createData(d[0], d[1], d[2], d[3], d[4]);
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
            ASSET MASTER - ITEM 1
          </div>
        </div>
        <Card className='tw-mx-[18vw] tw-mt-10 tw-rounded-sm tw-bg-white tw-px-10  tw-py-5'>
          <div className='tw-mt-3 tw-flex  tw-justify-between tw-gap-[30%] tw-font-extrabold'>
            <div className='tw-flex tw-flex-col'>
              <span className='tw-text-3xl'>ITEM 1</span>
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
          <div className='tw-mt-5 tw-flex   tw-gap-[2rem]'>
            <FormControl fullWidth className='tw-basis-1/3'>
              <FormLabel
                className='tw-ml-1 tw-py-2 tw-pb-5 !tw-text-sm !tw-text-gray-900'
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
                placeholder='Country | Email | Name'
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
                    <StyledTableCell>Source</StyledTableCell>
                    <StyledTableCell align='center'>Value </StyledTableCell>
                    <StyledTableCell align='center'>
                      Destination
                    </StyledTableCell>
                    <StyledTableCell align='center'>Value</StyledTableCell>
                    <StyledTableCell align='center'>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody className=' !tw-text-black'>
                  {rows.map((row: any) => (
                    <StyledTableRow key={row.source1}>
                      <StyledTableCell
                        className='!tw-font-bold tw-underline'
                        align='center'
                      >
                        {row.destination1}
                      </StyledTableCell>
                      <StyledTableCell
                        className='!tw-font-bold tw-underline'
                        align='center'
                      >
                        {row.status1}
                      </StyledTableCell>
                      <StyledTableCell
                        className='!tw-font-bold tw-underline'
                        align='center'
                      >
                        {row.value1}
                      </StyledTableCell>
                      <StyledTableCell
                        className='!tw-font-bold tw-underline'
                        align='center'
                      >
                        {row.value2}
                      </StyledTableCell>
                      <StyledTableCell
                        className='!tw-font-bold tw-underline'
                        align='center'
                      >
                        {row.value2}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className='tw-flex tw-justify-end tw-pr-5'>
            <button className='tw-rounded-lg tw-bg-primary tw-px-7 tw-py-3 tw-text-white'>
              RE PUSH DATA
            </button>
          </div>
        </Card>
      </section>
      <Footer className='tw-mt-10' />
    </>
  );
};

export default Home;
