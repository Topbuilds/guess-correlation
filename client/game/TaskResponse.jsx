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

//   handleChange = num => {
//     const { game, stage, player } = this.props;
//     if (stage.name !== "outcome") {
//       const value = Math.round(num * 100) / 100;
//       //this.setState({ guess: value });
//       // this.throttledGuessUpdate(value);
//       player.round.set("guess", value);
//     }
//   };

//   handleRelease = num => {
//     const { game, stage, player } = this.props;
//     if (stage.name !== "outcome") {
//        const value = Math.round(num * 100) / 100;
//       //this.setState({ guess: value });
//        player.round.set("guess", value);
//     //   player.stage.append("guess", value);
//     }
//   };

  handleEditTextConceptChange = str => {
    const { round, player } = this.props;
    // if (stage.name !== "outcome") {
    //   const value = Math.round(num * 100) / 100;
      //this.setState({ guess: value });
      //this.throttledGuessUpdate(value);
	//   player.round.set("question", str);
	//   if(0 === player.get("p_id")){
		player.round.set("set_concept", str);
	  	round.set("concept", str);
	//   }
    // }
  };

  handleEditTextConceptRelease = str => {
	const { round, player } = this.props;
    // const { stage, player } = this.props;
    // if (stage.name !== "outcome") {
	//   player.round.set("question", str);
	  
	// 	if(0 === player.get("p_id")){
		player.round.set("set_concept", str);
		round.set("concept", str);
		// }
    // }
  };

   handleEditTextChange = str => {
    const { stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  player.round.set("judgment",str)
	  else
	      player.round.set("question",str);
	  }
	//   if(stage.name !== "Guess concept")
	// 	player.round.set("question", str);
	//   else
	// 	player.round.set("guess_concept", str);
	//   if(0 === player.get("p_id")){
	// 	player.round.set("set_concept", str);
	//   	round.set("concept", str);
	//   }

  };

  handleEditTextRelease = str => {
    const { stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	//   if(stage.name !== "Guess concept")
	// 	player.round.set("question", str);
	//   else
	// 	player.round.set("guess_concept", str);
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  player.round.set("judgment",str)
	  else
	      player.round.set("question",str);
	  }
		// if(0 === player.get("p_id")){
		// 	player.round.set("set_concept", str);
		// 	round.set("concept", str);
		// }
  };

  handleEditTextCategoryChange = str => {
    const { round, player } = this.props;
		player.round.set("category", str);
	//   }
    // }
  };

  handleEditTextCategoryRelease = str => {
	const { round, player } = this.props;
		player.round.set("category", str);
		// }
    // }
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
          title={"Waiting on your partner..."}
          icon={"automatic-updates"}
        >
          Please wait until all players are ready
        </Callout>
      </div>
    );
  };




  renderCurrentGuess = (round, player) => {
	  if (0 === player.get("p_id")) 
		{
			return (
				
			<Label>
				it would be :{/*player.round.get("question")*/}
			</Label>

			);
		}
		else
		{
			return (
			<Label>
				What would it be, if it is: {/*player.round.get("question")*/}
				
			</Label>
			);
		}
    
  };

    renderCurrentCategory = (round,player) => {
	  if(0 === player.get("p_id"))
		{
			return (

				<Label>
					please enter the category of the concept that you are thinking about (e.g. City, animal, etc.): {/*player.round.get("category")*/}
				</Label>
			);
		}
  };

  renderCurrentChoice = (round, player) => {
	  if (0 === player.get("p_id"))
	  {
		  return(

			<Label>
				The concept you are thinking about is: {/*player.round.get("set_concept")*/}
			</Label>
		  );
	  }
  };

  renderMoveon = (round, player)=> {
	  return(

		<Label>
			Your partner is typing. Click "Submit" whenever you are ready to move on...
		</Label>
	  );
  };

  renderJudgement(player,round){
	  const { stage } = this.props;
	  const isGuess = stage.displayName === "Guess concept";
	  const isCheckconcept = stage.displayName === "Check concept"

	//   const isGuess =stage.name == "Guess concept";
	  if(0 === player.get("p_id") && isCheckconcept)
	  {
		  return(
			  <Label>
				  is it correct? please type "correct" or "incorrect":{/*player.round.set("judgment")*/}
			  </Label>
		  );	  
	  }
	  else if(1 === player.get("p_id") && isGuess)
	  {
		  return(
		  <Label>
			  please make a guess :{/*player.round.get("guess_concept")*/}
		  </Label>
		  );
	  }
  };

//    renderfinal(player,round){
// 	   const {}
//    }

  renderEditableTextConceptCatalog(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	const isSetConcept = stage.name === "Set concept" ;
	// const isQuestion = stage.displayName === "Question Phases1" || stage.name === "Question Phases2" || stage.name === "Question Phases3";

    return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextConceptChange}
            onRelease={this.handleEditTextConceptRelease}
            value={round.get("concept")}
            disabled={!isSetConcept}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextConceptChange}
            onRelease={this.handleEditTextConceptRelease}
            value={round.get("concept")}
            disabled={!isSetConcept}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }


  renderEditableText(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	const isSetConcept = stage.name === "Set concept" ;
	const isQuestion = stage.displayName.includes("Question")  //=== "Question Phases1" || stage.displayName === "Question Phases2" || stage.displayName === "Question Phases3";

    return (
      <FormGroup>
        {isSetConcept ? (
          <EditableText
		    onChange={this.handleEditTextCategoryChange}
            onRelease={this.handleEditTextCategoryRelease}
            value={player.round.get("category")}
            disabled={isQuestion}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            //value={player.round.get("question")}
            disabled={isQuestion}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }

  renderEditableText_player1(player, round, isOutcome) {
	const { stage } = this.props;
    const feedbackTime = round.get("displayFeedback");
	const correctAnswer = round.get("task").correctAnswer;
	// const player1 = player.p_id === 1;
	const isSetConcept = stage.name === "Set concept" ;
	const isAnswer = stage.displayName === "Answer Phases1" || stage.displayName === "Answer Phases2" || stage.displayName === "Answer Phases3";
	const isCheckconcept = stage.displayName === "Check concept"
	return (
      <FormGroup>
        {isOutcome && feedbackTime ? (
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer || isCheckconcept}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange}
            onRelease={this.handleEditTextRelease}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer || isCheckconcept}
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

//   renderFeedback = (player, otherPlayer,round) => {
// 	  if (1 === player.get("p_id"))
// 	  {
// 		  return(

// 			<Label>
// 				What you just guessed is {otherPlayer.round.get("judgment")}
// 			</Label>
// 		  );
// 	  }
//   };
//   }
//   renderFeedback = (player, round) => {
//     const { game } = this.props;
//     const peersFeedback = game.treatment.peersFeedback;

//     return (
//       <div>
//         <HTMLTable>
//           <thead>
//             <tr>
//               <th>Your guess</th>
//               <th>Actual correlation</th>
//               <th>Score increment</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td align="center">
//                 {player.round.get("guess_concept") === undefined ||
//                 player.round.get("guess_concept") === null
//                   ? "No guess given"
//                   : player.round.get("guess_concept")}
//               </td>
//               <td>{round.get("concept").correctAnswer}</td>
//               <td>
//                 <strong
//                   style={{
//                     color: peersFeedback
//                       ? player.round.get("scoreColor")
//                       : "black"
//                   }}
//                 >
//                   +{player.round.get("score")}
//                 </strong>
//               </td>
//             </tr>
//           </tbody>
//         </HTMLTable>
//       </div>
//     );
//   };

  render() {
    const { game, stage, round, player } = this.props;
    //todo: add this back after the experiment
	
    //if the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    const feedbackTime = round.get("displayFeedback");
	const isOutcome = stage.displayName === "Round Outcome" ;
	const isSetConcept = stage.name === "Set concept";
	const isAnswer = stage.displayName === "Answer Phases1" || stage.displayName === "Answer Phases2" || stage.displayName === "Answer Phases3";
	const isGuess = stage.displayName === "Guess concept";
	const isQuestion = stage.displayName === "Question Phases1" || stage.displayName === "Question Phases2" || stage.displayName === "Question Phases3";
	const isCheckconcept = stage.displayName === "Check concept"

	// const isOutcome = round.index === 5;
	const selfFeedback = game.treatment.selfFeedback;
	

	if(0 === player.get("p_id")){
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>

			<FormGroup>
			 	{isSetConcept ? this.renderCurrentCategory(round, player) : null}
			 	{isSetConcept ? this.renderEditableText(player, round, isOutcome):null}
			</FormGroup>

			<FormGroup>
				{isAnswer ? this.renderCurrentGuess(round, player) : null}
				{isAnswer ? this.renderEditableText(player, round, isOutcome):null}
			</FormGroup>

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(round, player) : null}
				{!isOutcome ? this.renderEditableTextConceptCatalog(player, round, isOutcome) :null}
			</FormGroup>

			<FormGroup>
				{isQuestion ||isGuess ? this.renderMoveon(round, player) : null}
			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isCheckconcept
				? this.renderJudgement(player, round)
				: null}
			{isCheckconcept
				? this.renderEditableText(player, round)
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
			{/* <FormGroup>
				{!isOutcome ? this.renderCurrentGuess(round, player) : null}
				{this.renderSlider(game, player, round, isOutcome)}
			</FormGroup> */}
			
			<FormGroup>
				{isQuestion ? this.renderCurrentGuess(round, player) : null}
				{isQuestion ? this.renderEditableText_player1(player, round, isOutcome):null}
			</FormGroup>

 			<FormGroup>
 				{isSetConcept ||isAnswer ||isCheckconcept ? this.renderMoveon(round, player) : null}
 			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isGuess?
				this.renderJudgement(player, round)
				: null}
			{isGuess?
				this.renderEditableText_player1(player,round,isOutcome):null}
 				
			{/* {isOutcome?
				this.renderFeedback(player,round):null}  */}

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