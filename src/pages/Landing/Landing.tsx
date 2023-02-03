import React, { FC } from "react";
import { Container } from "../../components";
import { useLoader } from "../../hooks";
import { RootLayout } from "../../layouts";

interface IProps {}

export const Landing: FC<IProps> = (props: IProps): JSX.Element => {
  const loader = useLoader();

  const handleShowLoader: () => void = () => {
    const task1 = loader.create("Loading resources...");
    const task2 = loader.create("Loading data...");
    const task3 = loader.create("Loading image...");

    loader.start(task1);
    console.log("task #1 started");

    setTimeout(() => {
      loader.start(task2);
      console.log("task #2 started");
    }, 2000);

    setTimeout(() => {
      loader.start(task3);
      console.log("task #3 started");
    }, 2500);

    setTimeout(() => {
      loader.stop(task1);
      console.log("task #1 stopped");
    }, 5000);

    setTimeout(() => {
      loader.stop(task2);
      console.log("task #2 stopped");
    }, 10000);

    setTimeout(() => {
      loader.stop(task3);
      console.log("task #3 stopped");
    }, 3000);
  };

  return (
    <RootLayout>
      <Container>
        <div>Hello world
          <button onClick={handleShowLoader}>show loader</button>
        </div>
      </Container>
    </RootLayout>
  );
};