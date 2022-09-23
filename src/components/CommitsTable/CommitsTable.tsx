import { FC, useState } from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { Commit } from '../../models/commit';
import { useAppSelector } from '../../app/hooks';
import { useCommits } from '../../hooks/useCommits';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const DEFAULT_ROWS_PER_PAGE = 10;

interface CommitRow {
  id: number;
  author: string;
  committer: string;
  message: string;
  date: string;
}

const commitsTableColumns: GridColumns<CommitRow> = [
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'committer', headerName: 'Committer', width: 150 },
  { field: 'message', headerName: 'Message', width: 650 },
  { field: 'date', headerName: 'Date', width: 175 },
];

type CommitsTableProps = {
  org: string;
};

const CommitsTable: FC<CommitsTableProps> = ({ org }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const repo = useAppSelector((state) => state.repoReducer.name);
  const [commits, isLoading, , error, isUninitialized] = useCommits(org, repo);

  const handleChangeRowsPerPage = (newPage: number) => {
    setRowsPerPage(newPage);
    setPage(0);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ height: 400, width: '100%' }}>
        {!isUninitialized && (
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{
                flex: '1 1 100%',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Commits List
            </Typography>
          </Toolbar>
        )}
        {commits ? (
          <DataGrid
            disableSelectionOnClick
            page={page}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={handleChangeRowsPerPage}
            density="compact"
            rows={mapCommits(commits)}
            columns={commitsTableColumns}
            loading={isLoading}
          />
        ) : (
          <DataGrid columns={commitsTableColumns} rows={[]} error={error} loading={isLoading} />
        )}
      </Box>
    </Container>
  );
};

export function mapCommits(commits: Commit[]) {
  return commits.map((commit, i) => ({
    id: i,
    author: commit.commit.author.name,
    committer: commit.commit.committer.name,
    message: commit.commit.message,
    date: commit.commit.committer.date,
  }));
}

export default CommitsTable;
