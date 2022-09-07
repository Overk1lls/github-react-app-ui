import { useEffect, useState } from 'react';
import { useLazyGetRepositoryCommitsQuery } from '../features/commits/commitsAPI';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { Commit } from '../models/commits';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const DEFAULT_ROWS_PER_PAGE = 10;

interface CommitRow {
  id: number;
  author: string;
  committer: string;
  message: JSX.Element;
  date: string;
}

const commitsTableColumns: GridColumns<CommitRow> = [
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'committer', headerName: 'Committer', width: 150 },
  { field: 'message', headerName: 'Message', width: 600 },
  { field: 'date', headerName: 'Date', width: 150 },
];

type CommitsTableProps = {
  org: string;
  repo: string;
}

export default function CommitsTable({ org, repo }: CommitsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [commits, setCommits] = useState<Commit[]>();
  const [triggerCommitsQuery] = useLazyGetRepositoryCommitsQuery({ refetchOnReconnect: true });

  useEffect(() => {
    const searchForCommits = setTimeout(async () => {
      const { data } = await triggerCommitsQuery({
        username: org,
        repository: repo
      }, true);
      setCommits(data?.commits);
    }, 600);
    return () => clearTimeout(searchForCommits);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo, triggerCommitsQuery]);

  const handleChangeRowsPerPage = (newPage: number) => {
    setRowsPerPage(newPage);
    setPage(0);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {commits && (<>
        <Toolbar sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Commits List
          </Typography>
        </Toolbar>
        {/* TODO: error / loading */}
        <DataGrid
          disableSelectionOnClick
          page={page}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={handleChangeRowsPerPage}
          density="compact"
          rows={commits.map((commit, i) => ({
            id: i,
            author: commit.commit.author.name,
            committer: commit.commit.committer.name,
            message: (
              <Link href={commit.html_url}>{commit.commit.message}</Link>
            ),
            date: commit.commit.committer.date,
          }))}
          columns={commitsTableColumns}
        />
      </>)}
    </Box>
  );
}