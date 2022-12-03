import styled from "@emotion/styled";

export const Subject = styled.div`
  font-size: 1.25rem;
  color: var(--light);
`;

export const Banner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  row-gap: 15px;
`;

export const UserBanner = styled.div`
  display: flex;
  flex-flow: row wrap;

  justify-content: space-between;
  row-gap: 10px;
  column-gap: 140px;
  align-items: center;

  & > .user {
    font-weight: 700;
    font-size: 2rem;

    white-space: nowrap;

    line-height: 100%;
    color: var(--light);
  }
`;

export const GuestBanner = styled.div`
  display: flex;
  flex-flow: column;

  row-gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;

  & > .icons {
    display: flex;
    flex-flow: row nowrap;
    column-gap: 1rem;

    & > * {
      font-size: 3.5rem;
      color: var(--light);
    }
  }

  & > .content {
    font-weight: 700;
    font-size: 2.25rem;
    line-height: 150%;

    word-break: keep-all;

    color: var(--light);

    // mobile
    @media screen and (max-width: 768px) {
      font-size: 1.75rem;
    }
  }
`;

export const EmptyNotificationBanner = styled.div`
  width: auto;
  height: 200px;
  border-radius: 15px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  background: rgba(255, 255, 255, 0.3);

  & > .icon {
    font-size: 4rem;
    color: var(--dark);
  }

  & > .content {
    font-weight: 700;
    font-size: 1.5rem;
    word-break: keep-all;
    text-align: center;

    color: var(--dark);
  }
`;
