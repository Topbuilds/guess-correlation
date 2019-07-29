import React from "react";
// import Slider from "meteor/empirica:slider";
import { Card, Elevation, Textarea, Text, StyleSheet } from "@blueprintjs/core";
import { shuffle } from "shuffle-seed";


export default class SocialExposure extends React.Component {
  renderSocialInteraction = (otherPlayer, player, stage) => {
    // "or 0" here if the user hasn't submitted a guess, defaulting to 0
	
	var question;
	if(stage.displayName === "Check concept")
	{
		if(1 === player.get("p_id"))
			question = "The correct concept by the other player is: " + otherPlayer.round.get("set_concept");
		else
			question = "The guess concept by the other player is: " + otherPlayer.round.get("guess_concept");
	}
	else 
		question = player.round.get("interact_des") + " " + otherPlayer.round.get("question");



    return (
      <Card className={"alter"} elevation={Elevation.TWO} key={otherPlayer._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              otherPlayer.stage.submitted
                ? "bp3-intent-success"
                : "bp3-intent-primary"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                otherPlayer.stage.submitted
                  ? "bp3-icon-tick"
                  : "bp3-icon-refresh"
              }`}
            />
          </span>

          <img src={otherPlayer.get("avatar")} />
        </span>

        {/* <Slider
          min={0}
          max={1}
          stepSize={0.01}
          value={guess || undefined}
          showTrackFill={false}
          disabled
          hideHandleOnEmpty
		/> */}
		
		{/* <textarea rows="5" cols="30" style="font-size: 18pt">Hello World!</textarea>  */}

		<Text id="textId"  rows="50" cols="60" style="font-size: 36pt">{question}</Text>
		
		{/* document.getElementById("textMy").innerHTML = value={question} */}

		{/* <Textarea style="font-size:80px"  value={question}></Textarea> */}
		
      </Card>
    );
  };

  render() {
    const { game, player, round, stage } = this.props;

    const alterIds = player.get("alterIds");
    const feedbackTime = round.get("displayFeedback");

    //all players sorted by performance in descending order if feedback, otherwise, shuffle but seed by player id (the same player will see the same order for the entire game
    const allPlayers =
      feedbackTime && game.treatment.peersFeedback
        ? _.sortBy(game.players, p => p.get("cumulativeScore")).reverse()
        : shuffle(game.players, player._id);

    const alters = allPlayers.filter(p => alterIds.includes(p._id));

    return (
      <div className="social-exposure">
        <p>
          <strong>Your partner:</strong>
        </p>
        {!_.isEmpty(alters)
          ? alters.map(alter => this.renderSocialInteraction(alter, player, stage))
          : "You are currently NOT following anyone"}
      </div>
    );
  }
}
