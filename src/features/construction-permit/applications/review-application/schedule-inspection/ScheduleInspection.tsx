import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../../components/breadcrumbs/Breadcrumbs";
import { Status } from "../../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../../rpc/rpc";
import SchedulingComplete from "./SchedulingComplete";

export default function ScheduleInspection() {
  const { id } = useParams();
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('button.my-applications'), `/housing/construction-permit/my-applications`],
    [
      `#${id}`,
      `/housing/construction-permit/my-applications/review/${id}`,
    ],
  ];
  const { data: applications } = useQuery(`applications`, rpc.getApplications);
  const application = applications?.find((appl) => appl.id === id);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(1);
  const [schedulingComplete, setSchedulingComplete] = useState(false);
  const handleDate = (event: any) => {
    setDate(new Date(event.target.value).toISOString());
  };

  const schedule = () => {
    if (applications && application) {
      application.status = Status.IN_REVIEW;
      application.action = "inReview";
      application.inspectionDate = (new Date(date).toISOString() + " / 1");
      rpc.forceSetData("applications", JSON.stringify([...applications.filter((app) => app.id !== id), application]));
      setSchedulingComplete(true);
    } else {
      alert(t('application.inspection.try-again'));
      window.location.reload();
    }
  }

  return (
    <>
      <Breadcrumbs path={breadcrumbs} />
      {schedulingComplete ? (
        <SchedulingComplete date={date} slot={slot}/>
      ) : (
        <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
          <Flex direction="column" gap="20px">
            <Heading variant="headline">
              Construction Permit Application
            </Heading>

            <Text variant="label">Application #{id}</Text>
            <Text>
              Please select a date from the available options. Please ensure
              your presence on the chosen date for the inspection on location.
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            <Text variant="label">Select a Date</Text>
            <Input type="date" value={date} onChange={handleDate} />
          </Flex>
          <Flex direction="column" gap="20px">
            <Text variant="label">Select a Time Slot</Text>
            {!date && <Text>Please pick a date first</Text>}
            {date && (
              <>
                <Button onClick={() => setSlot(1)} justifyContent="space-between" color={slot === 1?"white":"black"} colorScheme={slot === 1?"admin":"white"}>
                  <span>{new Date(date).toLocaleString("en", { day: "2-digit"}) + " " + new Date(date).toLocaleString("en", { month: "long"})}</span>
                  <span>9:00 - 12:00</span>
                </Button>
                <Button
                  justifyContent="space-between"
                  color={slot === 2?"white":"black"}
                  colorScheme={slot === 2?"admin":"white"}
                  onClick={() => setSlot(2)}
                >
                  <span>{new Date(date).toLocaleString("en", { day: "2-digit"}) + " " + new Date(date).toLocaleString("en", { month: "long"})}</span>
                  <span>13:00 - 16:00</span>
                </Button>
              </>
            )}
          </Flex>
          <Flex mt="auto" direction={{base: "column", md: "row"}}>
            <Grid
              gap="10px"
              w="100%"
              gridAutoColumns={{base:"100%", md: "50%"}}
              templateAreas={{
                base: `"a" "b"`,
                md: `"b a"`
            }}>
              <Button gridArea="a" disabled={!date} colorScheme={date?"admin":"disabled"} onClick={() => date?(schedule()):{}}>
                Schedule
              </Button>
              <Button gridArea="b" colorScheme="admin" variant="outline" onClick={() => schedule()}>
                Back
              </Button>
            </Grid>
          </Flex>
        </Flex>
      )}
    </>
  );
}
