import React from "react";

import { Centered } from "meteor/empirica:core";
import { Button, ButtonGroup } from "@blueprintjs/core";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { player } = this.props;
    player.set("instructionsCumulativeScore", 11);
  }
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Game overview </h1>
          <p>
            After completing the instructions, you will
            begin the game.
          </p>
          <p>
            The game consists of{" "}
            <strong>{game.treatment.nRounds} rounds</strong>{" "}
            {game.treatment.playerCount > 1 ? (
              <span>
                and you will play simultaneously{" "}
                <strong>
                  {" "}
                  with {game.treatment.playerCount} other MTurk worker
                </strong>
              </span>
			) : null}
			<p>
					In this game, you'll be either a {"  "}
					<strong>guesser</strong> or a {"  "}
					<strong>thinker</strong>.
					<br />
					At the beginning of each round, the thinker will be prompted to give a common 
					concept (e.g., New York, Jesus, etc.). Meanwhile, the thinker should enter the category 
					of that concept (e.g., city, person, etc.)
					The guesser will be notified the category of that concept and ask the thinker a
					question like "what would it be, if it is a X(e.g.,profession)?" Then the thinker should reply
					with a particular entity in X (e.g., teacher) that best describes the concept he/she is thinking about.
					At the end of each round, the guesser will make a guess about that concept.  
					<strong>This is a collaborative game and if the guesser get it right both of you will win bonus for it.</strong>
			</p>
          </p>

          <ButtonGroup className={"button-group"}>
            <Button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              icon="arrow-left"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              rightIcon="arrow-right"
              intent="primary"
              alignText={"right"}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      </Centered>
    );
  }
}
