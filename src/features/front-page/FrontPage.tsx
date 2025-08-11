import { Grid, GridItem } from "@chakra-ui/layout";
import { useAuthentication } from "../../utilities/useAuthentication";
import RecentActivity from "../construction-permit/recent-activity/RecentActivity";
import Announcements from "./components/announcements/Announcements";
import Hero from "./components/hero/Hero";
import PopularServices from "./components/popular-services/PopularServices";
import Topics from "./components/topics/Topics";

export default function FrontPage() {
  const { isAuthenticated } = useAuthentication();
  return (
    <Grid
      templateAreas={{
        xs: `"hero" ${isAuthenticated()?"\"recent-activity\"":""} "popular-services" "topics" "announcements"`,
        sm: `"hero" ${isAuthenticated()?"\"recent-activity\"":""} "popular-services" "topics""announcements"`,
        md: `"hero hero"
        ${isAuthenticated()?"\"topics recent-activity\" \"topics popular-services\"":"\"topics popular-services\" \"topics announcements\""}
        "topics announcements"
        "topics announcements"`,
      }}
    >
      <GridItem area={"hero"}>
        <Hero />
      </GridItem>
      {isAuthenticated() && (
        <>
          <GridItem area={"recent-activity"}>
            <RecentActivity />
          </GridItem>
        </>
      )}
      <GridItem area="popular-services">
        <PopularServices />
      </GridItem>
      <GridItem area="topics">
        <Topics />
      </GridItem>
      <GridItem area="announcements">
        <Announcements />
      </GridItem>
    </Grid>
  );
}
