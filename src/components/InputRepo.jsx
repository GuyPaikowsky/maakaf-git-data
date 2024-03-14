import react from "react";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import ScrollableDropDown from "./ScrollableDropDown";

function InputRepo({
  handleFetch,
  handleFetchAll,
  handleDownload,
  repositories,
  loadingStatus,
}) {
  const [owner, setOwner] = react.useState("hasadna");
  const [repo, setRepo] = react.useState("open-bus-map-search");
  const [reposName, setReposName] = react.useState([]);

  //TODO: Refactor and consolidate...
  function handleSubmit(owner, repo) {
    handleFetch(owner, repo);
    setRepo("");
    setOwner("");
  }

  function handleSubmitFullFetch(owner, repo) {
    handleFetchAll(owner, repo);
    setRepo("");
    setOwner("");
  }

  react.useEffect(() => {
    let repositoriesArray = [];
    if (repositories && repositories.length > 0) {
      repositoriesArray = repositories.map((repository) => {
        return { value: repository.name, label: repository.name };
      });
      console.log(
        "ReposName: " +
          JSON.stringify(repositoriesArray) +
          " " +
          repositoriesArray.length,
      );
      setReposName(repositoriesArray);
    }
  }, [repositories]);

  return (
    <Flex gap="4" justify="center" wrap="wrap">
      <TextField.Root>
        <TextField.Slot>
          <GitHubLogoIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Enter Owner…"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </TextField.Root>

      <ScrollableDropDown options={reposName} loadingStatus={loadingStatus} />

      <Button
        size="2"
        variant="soft"
        onClick={() => handleSubmit(owner, repo)}
        disabled={loadingStatus === true}
      >
        {loadingStatus === true ? "Loading..." : "Fetch Data Sample"}
      </Button>

      <Button
        size="2"
        variant="soft"
        onClick={() => handleSubmitFullFetch(owner, repo)}
        disabled={loadingStatus === true}
      >
        {loadingStatus === true ? "Loading..." : "Fetch Full Data"}
      </Button>

      <Button
        size="2"
        variant="soft"
        color="crimson"
        disabled={loadingStatus === true}
        onClick={() => handleDownload()}
      >
        {loadingStatus === true ? "Loading..." : "Download CSV"}
      </Button>
    </Flex>
  );
}

export default InputRepo;
