import React from "react";
import Papa from "papaparse";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addMember } from "../../../state/actions/projectOnboardingActions";
import { FaFileCsv } from 'react-icons/fa';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none"
  },
  button: {
    marginTop: 9,
    color: "#ff5722",
    // borderColor: "#ff5722",
    backgroundColor: "#F5F6F8"
  },
}));
export default function CSVFileReaderButton({
          title,
  }) 
  {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onChangeCsvUpload = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    if (files) {
      reader.readAsText(files);
    }
    const config = {
      delimiter: "",
      newline: "",
      quoteChar: '"',
      escapeChar: '"',
      header: true,
      preview: 0,
      step: undefined,
      complete: undefined,
      error: undefined,
      skipEmptyLines: "greedy",
      delimitersToGuess: [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP]
    };

    let csvData = "";
    reader.addEventListener("load", (e) => {
      csvData = e.target.result;
      const datafetched = [...Papa.parse(csvData, config).data];
      
      let arr = [];
      datafetched.map(
        (user) =>
          (arr = [
            ...arr,
            {
              username: user?.username.trim(),
              roles: user?.role.trim(),
              name: user?.name.trim(),
            }
          ])
      );
      saveToStore(arr)
    });

    const saveToStore = (arr) => {
        arr.map((item)=>{
          dispatch(addMember(JSON.stringify(item)))
        });
    }

  };
  return (
    <>
      <input
        accept=".csv"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={(e) => {
          onChangeCsvUpload(e);
        }}
      />
      <Tooltip title={title}>
        <Button
          className={classes.button}
          variant="outlined"
          startIcon={<FaFileCsv />}
          onChange={(e) => {
            onChangeCsvUpload(e);
          }}
        >
            <label htmlFor="icon-button-file" style={{ marginTop:2 }}>
          Import
          </label>
        </Button>
      </Tooltip>
    </>
  );
}


CSVFileReaderButton.propTypes = {
  title: PropTypes.string
}
