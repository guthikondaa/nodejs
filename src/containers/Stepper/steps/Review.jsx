import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { Grid, Divider, Box, Chip, Tooltip } from "@material-ui/core";
import MaterialTable from 'material-table';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import Table from '../pages/Table';
import { dateformatMMDDYYYY } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#00474f"
  },
  table: {
    width: "100%",
    border: "none",
    borderSpacing: 0,
    textAlign: "left",
  },
  thead: {
    fontSize: "1rem",
    lineHeight: 1.5,
    color: "#8c8c8c",
    borderBottom: "4px solid #f0f0f0"
  }
}));

export default function Review() {
  const classes = useStyles();
  const {projectsUnderProvision, definition} = useSelector(state => state.projectOnboarding);


  const columns = [
    {
      title: "Name",
      field: "name",
      cellStyle: {
        color: '#434343',
        fontSize: "15px",
        borderRadius: "100",
      },
    },
    {
      title: "Role",
      field: "roles",
      cellStyle: {
        color: '#434343',
        fontSize: "15px",
        borderRadius: "100",
      },
    },
    {
      title: "JIRA",
      field: "jira",
      cellStyle: {
        color: '#434343',
        fontSize: "15px",
        borderRadius: "100",
      },
    },
    {
      title: "BITBUCKET",
      field: "bitbucket",
      cellStyle: {
        color: '#434343',
        fontSize: "15px",
        borderRadius: "100",
      },
    },
    {
      title: "TEAMS",
      field: "teams",
      cellStyle: {
        color: '#434343',
        fontSize: "15px",
        borderRadius: "100",
      },
    },
  ]
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box width="100%" display="flex">
            <Box>
              <DonutLargeIcon fontSize="small" style={{ color: "#595959", marginRight: 10 }} />
            </Box>
            <Box style={{ marginTop: -4 }}>
              <Typography className={classes.heading}>Project Details</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%" style={{ padding: 30 }}>
            <Box width="100%" display="flex">
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th><p className={classes.thead}>Name</p></th>
                    <th><p className={classes.thead}>Start Date</p></th>
                    <th><p className={classes.thead}>End Date</p></th>
                    <th><p className={classes.thead}>Status</p></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <Typography>{definition?.projectName}</Typography>
                    </td>
                    <td>
                      <Typography>{dateformatMMDDYYYY(definition?.startDate)}</Typography>
                    </td>
                    <td>
                      <Typography>{dateformatMMDDYYYY(definition?.endDate)}</Typography>
                    </td>
                    <td>
                      <Typography><Chip label={definition?.status} style={{ backgroundColor: '#5cdbd3', borderColor: '#5cdbd3' }} /></Typography>
                    </td>
                  </tr>
                </tbody>
              </table>



            </Box>

            {/* Tools */}
            <Box width="100%">
              <Box width="100%" style={{ marginTop: 50 }}>
                <Typography variant="h6" >Tools</Typography>
                <Divider style={{ lineHeight: 1.5 }} />
              </Box>
              <Box width="100%" display="flex" justifyContent="flexStart" style={{ marginTop: 10 }}>
                {
                  definition.tools.jira && (
                    <Chip variant="outlined" label="JIRA" style={{ backgroundColor: '#d3f261', borderColor: '#d3f261', marginRight: 10 }} />
                  )
                }
                {
                  definition.tools.teams && (
                    <Chip variant="outlined" label="TEAMS" style={{ backgroundColor: '#40a9ff', borderColor: '#40a9ff', marginRight: 10 }} />
                  )
                }
                {
                  definition.tools.bitbucket && (
                    <Chip variant="outlined" label="BITBUCKET" style={{ backgroundColor: '#b37feb', borderColor: '#b37feb', marginRight: 10 }} />
                  )
                }
              </Box>
            </Box>
            <Box width="100%">
              <Box width="100%" style={{ marginTop: 50 }}>
                <Typography variant="h6">Owner</Typography>
                <Divider />
              </Box>
              <Box width="100%" display="flex">
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th><p className={classes.thead}>Sr.No</p></th>
                      <th><p className={classes.thead}>Name</p></th>
                      <th><p className={classes.thead}>Email</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      definition.owner.map((item, index) => (
                        <tr>
                          <td>
                            <Typography>{index + 1}</Typography>
                          </td>
                          <td>
                            <Typography>{item?.name}</Typography>
                          </td>
                          <td>
                            <Typography>{item?.email}</Typography>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box width="100%" display="flex">
            <Box>
              <PeopleAltOutlinedIcon fontSize="small" style={{ color: "#595959", marginRight: 10 }} />
            </Box>
            <Box style={{ marginTop: -4 }}>
              <Typography className={classes.heading} >Member Roles</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%">
            <MaterialTable
              title={<Box>No of Members: {definition.members?.length}</Box>}
              columns={columns}
              data={definition.members}
              options={{
                pageSize: 2,
                search: false,
                padding: "dense",
                searchFieldVariant: "outlined",
                rowStyle: rowData => ({
                  backgroundColor: "#FAFBFC",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  fontSize: ".8125rem"
                }),
                headerStyle: {
                  backgroundColor: '#ffff',
                  color: "#5E6C84",
                  paddingLeft: 20,
                  paddingRight: 20,
                },

                actionsColumnIndex: -1,
                addRowPosition: "first",
                searchFieldStyle: {
                  backgroundColor: 'rgb(250, 250, 250)',
                  width: "210",
                  margin: "auto",
                  height: 40,
                  borderRadius: 12,
                }
              }}
            />
            <br />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div >
  );
}
