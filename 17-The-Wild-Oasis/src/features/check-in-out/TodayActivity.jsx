import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  overflow: hidden;
`;

const TodayList = styled.ul`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {activities?.length > 0 ? (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activity today</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
