import React from "react";
import Slider from "meteor/empirica:slider";
import { Card, Elevation } from "@blueprintjs/core";
import { shuffle } from "shuffle-seed";

export default class SocialExposure extends React.Component {
  renderSocialInteraction = otherPlayer => {
    // "or 0" here if the user hasn't submitted a guess, defaulting to 0
    const guess = otherPlayer.round.get("guess");
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

        <Slider
          min={0}
          max={1}
          stepSize={0.01}
          value={guess || undefined}
          showTrackFill={false}
          disabled
          hideHandleOnEmpty
        />
      </Card>
    );
  };

  render() {
    const { game, player, round } = this.props;

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
          <strong>You are following:</strong>
        </p>
        {!_.isEmpty(alters)
          ? alters.map(alter => this.renderSocialInteraction(alter))
          : "You are currently NOT following anyone"}
      </div>
    );
  }
}
