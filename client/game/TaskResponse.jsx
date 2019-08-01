import React from "react";
import {
  Button,
  Callout,
  FormGroup,
  Label,
  EditableText
} from "@blueprintjs/core";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    // console.log("player.round._id", this.props.player.round._id);

  }

  handleEditTextConceptChange = str => {
    const { round, player } = this.props;
	player.round.set("set_concept", str);
	round.set("concept", str);

  };

  handleEditTextConceptRelease = str => {
	const { round, player } = this.props;
	player.round.set("set_concept", str);
	round.set("concept", str);
  };

   handleEditTextChange1 = str => {
    const { round, stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  round.set("judgment",str);
	  else
	  {
		  player.round.set("question",str);
		  player.stage.set("stage_question", str);
	  }
	}
  };

  handleEditTextRelease1 = str => {
    const { stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  player.round.set("judgment",str)
	  else
	  {
		  player.round.set("question",str);
		  player.stage.set("stage_question", str);
	  }
	}
  };

     handleEditTextChange0 = str => {
    const { round, stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  round.set("judgment",str);
	  else
	  {
		  player.round.set("answer",str);
		  player.stage.set("stage_answer", str);
	  }
	}
  };

  handleEditTextRelease0 = str => {
    const { stage, player } = this.props;
    if (stage.displayName !== "Round outcome") {
	  if(stage.displayName === "Guess concept")
		  player.round.set("guess_concept", str);
	  if(stage.displayName === "Check concept")
		  player.round.set("judgment",str)
	  else
	  {
		  player.round.set("answer",str);
		  player.stage.set("stage_answer", str);
	  }
	}
  };
  handleEditTextCategoryChange = str => {
    const { player } = this.props;
	player.round.set("category", str);

  };

  handleEditTextCategoryRelease = str => {
	const { player } = this.props;
	player.round.set("category", str);

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


  renderCurrentGuess = (player) => {
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

    renderCurrentCategory = (player) => {
	  if(0 === player.get("p_id"))
		{
			return (

				<Label>
					please enter the category of the concept that you are thinking about (e.g. City, animal, etc.): {/*player.round.get("category")*/}
				</Label>
			);
		}
  };

  renderCurrentChoice = (player) => {
	  if (0 === player.get("p_id"))
	  {
		  return(

			<Label>
				The concept you are thinking about is: {/*player.round.get("set_concept")*/}
			</Label>
		  );
	  }
  };

  renderMoveon = ()=> {
	  return(

		<Label>
			Your partner is typing. Click "Submit" whenever you are ready to move on...
		</Label>
	  );
  };

  renderJudgement(player){
	  const { stage } = this.props;
	  const isGuess = stage.displayName === "Guess concept";
	  const isCheckconcept = stage.displayName === "Check concept";

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

  renderEditableTextConceptCatalog(round, stage, isOutcome) {

	const isSetConcept = stage.name === "Set concept" ;

    return (
      <FormGroup>
        {isOutcome? (
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


  renderEditableText(player, stage) {

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
		    onChange={this.handleEditTextChange0}
            onRelease={this.handleEditTextRelease0}
            //value={player.round.get("question")}
            disabled={isQuestion}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }

  renderEditableText_player1(stage, isOutcome) {
	const isSetConcept = stage.name === "Set concept" ;
	//const isAnswer = stage.displayName === "Answer Phases1" || stage.displayName === "Answer Phases2" || stage.displayName === "Answer Phases3";
	const isAnswer = stage.displayName.includes("Answer");
	const isCheckconcept = stage.displayName === "Check concept";
	return (
      <FormGroup>
        {isOutcome ? (
          <EditableText
		    onChange={this.handleEditTextChange1}
            onRelease={this.handleEditTextRelease1}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer || isCheckconcept}
            hideHandleOnEmpty
          />
		):
		(
          <EditableText
		    onChange={this.handleEditTextChange1}
            onRelease={this.handleEditTextRelease1}
            // value={player.round.get("question")}
            disabled={isOutcome || isSetConcept || isAnswer || isCheckconcept}
            hideHandleOnEmpty
          />
		)}
      </FormGroup>
    );
  }


  render() {
    const { stage, round, player } = this.props;
    //todo: add this back after the experiment
	
    //if the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    
	const isOutcome = stage.displayName === "Round Outcome" ;
	const isSetConcept = stage.name === "Set concept";
	//const isAnswer = stage.displayName === "Answer Phases1" || stage.displayName === "Answer Phases2" || stage.displayName === "Answer Phases3";
	const isGuess = stage.displayName === "Guess concept";		
	const isAnswer = stage.displayName.includes("Answer");
	const isQuestion = stage.displayName.includes("Question");
	const isCheckconcept = stage.displayName === "Check concept";

	// const feedbackTime = round.get("displayFeedback");
	// const selfFeedback = game.treatment.selfFeedback;
	

	if(0 === player.get("p_id")){
		return (
		<div className="task-response">
			<form onSubmit={this.handleSubmit}>

			<FormGroup>
			 	{isSetConcept ? this.renderCurrentCategory(player) : null}
			 	{isSetConcept ? this.renderEditableText(player, stage):null}
			</FormGroup>

			<FormGroup>
				{isAnswer ? this.renderCurrentGuess(player) : null}
				{isAnswer ? this.renderEditableText(player, stage):null}
			</FormGroup>

			<FormGroup>
				{!isOutcome ? this.renderCurrentChoice(player) : null}
				{!isOutcome ? this.renderEditableTextConceptCatalog(round, stage, isOutcome) :null}
			</FormGroup>

			<FormGroup>
				{isQuestion ||isGuess ? this.renderMoveon(round, player) : null}
			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isCheckconcept
				? this.renderJudgement(player)
				: null}
			{isCheckconcept
				? this.renderEditableText(player, stage)
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
				{isQuestion ? this.renderCurrentGuess(player) : null}
				{isQuestion ? this.renderEditableText_player1(stage, isOutcome):null}
			</FormGroup>

 			<FormGroup>
 				{isSetConcept ||isAnswer ||isCheckconcept ? this.renderMoveon(round, player) : null}
 			</FormGroup>

			{/*We only show self feedback if it is feedback time & we show individual feedback & it is outcome*/}
			{isGuess?
				this.renderJudgement(player)
				: null}
			{isGuess?
				this.renderEditableText_player1(stage, isOutcome):null}
 				
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