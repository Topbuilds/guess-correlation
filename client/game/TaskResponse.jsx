import React from "react";
import Slider from "meteor/empirica:slider";
import {
  HTMLTable,
  Button,
  Callout,
  FormGroup,
  Label,
  RangeSlider,
  EditableText
} from "@blueprintjs/core";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    // console.log("player.round._id", this.props.player.round._id);
    //
    // const { player } = this.props;
    //
    // this.throttledGuessUpdate = _.throttle(value => {
    //   player.round.set("guess", value);
    // }, 50);
    //
    // this.state = { guess: null };
  }

  handleChange = num => {
    const { game, stage, player } = this.props;
    if (stage.name !== "outcome") {
      const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      // this.throttledGuessUpdate(value);
      player.round.set("guess", value);
    }
  };

  handleRelease = num => {
    const { game, stage, player } = this.props;
    if (stage.name !== "outcome") {
       const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
       player.round.set("guess", value);
    //   player.stage.append("guess", value);
    }
  };

  handleEditTextChange = str => {
    const { stage, player } = this.props;
    if (stage.name !== "outcome") {
    //   const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      //this.throttledGuessUpdate(value);
	  player.round.set("choice", str);
	  if(0 === player.get("p_id")){
	  	round.set("answer", str);
	  }
    }
  };

  handleEditTextRelease = str => {
    const { stage, player } = this.props;
    if (stage.name !== "outcome") {
	  player.round.set("choice", str);
	  
		if(0 === player.get("p_id")){
			round.set("answer", str);
		}
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted = () => {
    return (
      <div className={"task-response"}>
        <Callout
          className={"call-out"}
          title={"Waiting on other players..."}
          icon={"automatic-updates"}
        >
          Please wait until all players are ready
        </Callout>
      </div>
    );
  };

  renderCurrentGuess = (round, player) => {
	  if(round.index === 0)
		{
			return (
				
			<Label>
				Your current concept round 0 is:{player.round.get("guess")}
			</Label>

			);
		}
		else
		{
			return (
			<Label>
				Your current guess of the correlation is: {player.round.get("guess")}
				
			</Label>
			);
		}
    
  };
  
  renderCurrentChoice = (round, player) => {
	  const { game } = this.props;
      if(round.index === 0)
		{
			return (
				
			<Label>
				Your current concept round 0 is:{player.round.get("choice")}
			</Label>

			);
		}
		else
		{
			return (
			<Label>
				{/* Your current choice of the correlation is: {player.round.get("choice")} */}
				Your current answer of the correlation is: {round.get("answer")}
				{/* player 1 guess of the correlation is: {game.player[0].round.get("guess")} */}
			</Label>
			);
		}
  };

  renderEditableText(player, round, isOutcome) {
    const feedbackTime = round.get("displayFeedback");
    const correctAnswer = round.get("task").correctAnswer;
    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            value={player.round.get("choice")}
            disabled={isOutcome}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            value={player.round.get("choice")}
            disabled={isOutcome}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }


  renderSlider(game, player, round, isOutcome) {
    const feedbackTime = round.get("displayFeedback");
    const correctAnswer = round.get("task").correctAnswer;
    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <RangeSlider
            className={"range-slider"}
            disabled={true}
            min={0}
            max={1}
            stepSize={0.01}
            labelStepSize={0.25}
            value={
              player.round.get("guess") === null
                ? [correctAnswer, correctAnswer]
                : [player.round.get("guess"), correctAnswer].sort()
            }
          />
        ) : (
          <Slider
            min={0}
            max={1}
            stepSize={0.01}
            labelStepSize={0.25}
            onChange={this.handleChange}
            onRelease={this.handleRelease}
            value={player.round.get("guess")}
            disabled={isOutcome}
            hideHandleOnEmpty
          />
        )}
      </FormGroup>
    );
  }

  renderFeedback = (player, round) => {
    const { game } = this.props;
    const peersFeedback = game.treatment.peersFeedback;

    return (
      <div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Your guess</th>
              <th>Actual correlation</th>
              <th>Score increment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                {player.round.get("guess") === undefined ||
                player.round.get("guess") === null
                  ? "No guess given"
                  : player.round.get("guess")}
              </td>
              <td>{round.get("task").correctAnswer}</td>
              <td>
                <strong
                  style={{
                    color: peersFeedback
                      ? player.round.get("scoreColor")
                      : "black"
                  }}
                >
                  +{player.round.get("score")}
                </strong>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </div>
    );
  };

  render() {
    const { game, stage, round, player } = this.props;
    //todo: add this back after the experiment

    //if the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    const feedbackTime = round.get("displayFeedback");
	const isOutcome = stage.name === "outcome";
	// const isOutcome = round.index === 5;
	const selfFeedback = game.treatment.selfFeedback;
	

	if(0 === player.get("p_id")){
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>
			<FormGroup>
				{!isOutcome ? this.renderCurrentGuess(round, player) : null}
				{this.renderSlider(game, player, round, isOutcome)}
			</FormGroup>

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{this.renderEditableText(player, round, isOutcome)}
			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isOutcome && feedbackTime && selfFeedback
				? this.renderFeedback(player, round)
				: null}

			<FormGroup>
				<Button type="submit" icon={"tick"} large={true} fill={true}>
				{isOutcome ? "Next" : "Submit"}
				</Button>
			</FormGroup>
			</form>
		</div>
		);
	}
	else
	{
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>
			<FormGroup>
				{!isOutcome ? this.renderCurrentGuess(round, player) : null}
				{this.renderSlider(game, player, round, isOutcome)}
			</FormGroup>

			{/* <FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{this.renderEditableText(player, round, isOutcome)}
			</FormGroup> */}

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isOutcome && feedbackTime && selfFeedback
				? this.renderFeedback(player, round)
				: null}

			<FormGroup>
				<Button type="submit" icon={"tick"} large={true} fill={true}>
				{isOutcome ? "Next" : "Submit"}
				</Button>
			</FormGroup>
			</form>
		</div>
		);
	}
  }
}
