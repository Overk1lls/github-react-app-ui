import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useRepositories } from '../../hooks/useRepositories';
import { addRepositoryName } from '../../features/repositories/repositorySlice';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';

type RepositoryListProps = {
  org: string;
};

const RepositoryList: FC<RepositoryListProps> = ({ org }) => {
  const [data, isLoading, isError, error] = useRepositories(org);
  const dispatch = useAppDispatch();
  const repo = useAppSelector((state) => state.repoReducer.name);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    dispatch(addRepositoryName(e.target.value as string));
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} disabled={!!!data}>
        <InputLabel id="select-repo-label">Repositories</InputLabel>
        <Select
          label="Repositories"
          labelId="select-repo-label"
          value={repo}
          onChange={handleSelectChange}
        >
          {data &&
            data.map((repository) => (
              <MenuItem key={repository.id} value={repository.name}>
                {repository.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {isLoading && (
        <Alert severity="info" sx={{ p: '0.7rem' }}>
          Loading...
        </Alert>
      )}

      {isError && <Alert severity="error">{JSON.stringify(error)}</Alert>}
    </>
  );
};

export default RepositoryList;
