import { useEffect, useState } from 'react';
import { Repository } from '../models/repository';
import { useLazyGetRepositoriesQuery } from '../features/repositories/repositoriesAPI';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

type RepositoryListProps = {
  setRepoName: (name: string) => void;
  setOrgName: (name: string) => void;
};

export default function RepositoryList({ setRepoName, setOrgName }: RepositoryListProps) {
  const [org, setOrg] = useState('');
  const [repo, setRepo] = useState('');
  const [repos, setRepos] = useState<Repository[]>();
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [triggerRepoQuery] = useLazyGetRepositoriesQuery({ refetchOnReconnect: true });

  useEffect(() => {
    const searchForRepos = setTimeout(async () => {
      if (org.length > 1) {
        const { data } = await triggerRepoQuery(org, true);
        setRepos(data?.repositories);
        setSelectDisabled(false);
      };
    }, 1500);
    return () => clearTimeout(searchForRepos);
  }, [org, triggerRepoQuery]);

  const handleOrgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setOrg(name);
    setOrgName(name);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.value as string;
    setRepo(name);
    setRepoName(name);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        m: '2rem',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Organization"
        variant="outlined"
        color="primary"
        sx={{ my: 2 }}
        value={org}
        onChange={handleOrgInput}
      />
      {/* TODO: make a loading spinner */}
      <FormControl sx={{ m: 1, minWidth: 120 }} disabled={selectDisabled}>
        <InputLabel id="select-repo-label">Repositories</InputLabel>
        <Select
          label="Repositories"
          labelId="select-repo-label"
          value={repo}
          onChange={handleSelectChange}
        >
          {repos && repos.map((repository, i) => (
            <MenuItem key={i} value={repository.name}>
              {repository.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}