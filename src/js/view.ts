import * as $ from "jquery";
import { startGame } from "../app";
import BasicEnemy from "./objects/enemies/basic";
import FastEnemy from "./objects/enemies/fast";
import TankEnemy from "./objects/enemies/tank";
import UfoEnemy from "./objects/enemies/ufo";
import StrongEnemy from "./objects/enemies/strong";

const api = "/scores";
class View {
  private healtBar;
  public pseudo: string = "";

  constructor() {
    this.healtBar = new HealthBar();
    this.setScore(0);
    this.setWaves(0);
  }

  public setHp(hp: number) {
    if (hp < 0) {
      hp = 0;
    }
    this.healtBar.setHp(hp);
  }

  public setInvul(invul: boolean) {
    if (invul) {
      $(".bar").css("background-color", "#4169E1");
    } else {
      $(".bar").css("background-color", "#c54");
    }
  }

  // TODO Use UI icon to display score
  public setScore(score: number) {
    $(".info_SCORE").html("");

    for (const number of score.toString()) {
      $(".info_SCORE").append(
        `<img src="/assets/images/UI/numeral${number}.png" />`
      );
    }
  }

  public setWaves(wave: number) {
    $(".info_WAVES").html(wave.toString());
  }

  public async sendScore(score: number) {
    $("#endgameModal").show();
    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(".leaderboardTab").addClass("current");
    $("#tab-1").addClass("current");

    const key = "0bfuScat3d_K3y"
    const signature = (score: number) => {
      let s = String(score) + key
      let hash = 0,
      i, chr;
      if (s.length === 0) return hash;
      for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
      }
      return hash;
    }
    await $.ajax({
      type: "POST",
      url: api,
      data: JSON.stringify({
        score: score.toString(),
        signature: signature(score),
        pseudo: this.pseudo,
      }),
      contentType: 'application/json'
    });
    this.setLeaderboard()
  }

  public getLeaderboard() {
    return $.get(api);
  }

  public setLeaderboard() {
    let leaderboard = $("#LeaderboardList");
    leaderboard.html("");

    this.getLeaderboard().then((data) => {
      for (let i = 0; i < data.length; i++) {
        const score = data[i];
        leaderboard.append(`
          <tr>
            <td class="position">#${i + 1}</td>
            <td class="pseudo">${score.pseudo} ${i === 0 ? "👑" : ""}</td>
            <td class="score">${score.score}</td>
          </tr>
        `);
      }
    });
  }

  public setBonus(list: string[]) {
    $("#bonusList").html("");
    for (const bonus of list) {
      $("#bonusList").append(`
        <li>
          <img
            src="${bonus}"
            height="30px"
            width="30px"
          />
        </li>
        `);
    }
  }
}

class HealthBar {
  hBar: any;
  bar: any;
  hit: any;
  val: any;

  constructor() {
    this.hBar = $(".health-bar");
    this.bar = this.hBar.find(".bar");
    this.hit = this.hBar.find(".hit");
    this.val = this.hBar.find(".hpval");
  }

  public setHp(hp: number) {
    let total = this.hBar.data("total");
    let value = this.hBar.data("value");
    let diff = hp - value;

    this.val.html(hp);
    if (value < 0) {
      return;
    }

    var barWidth = (hp / total) * 100;
    var hitWidth = (hp / value) * 100 + "%";

    this.hit.css("width", hitWidth);
    this.hBar.data("value", hp);

    if (diff < 0) {
      setTimeout(() => {
        this.hit.css({ width: "0" });
        this.bar.css("width", barWidth + "%");
      }, 500);
    } else {
      this.hit.css({ width: "0" });
      this.bar.css("width", barWidth + "%");
    }
  }

  public fullBar() {
    this.hBar.data("value", this.hBar.data("total"));

    this.hit.css({ width: "0" });

    this.bar.css("width", "100%");
  }
}

const view = new View();

$(() => {
  view.setLeaderboard();

  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  $("#restartBtn").on("click", () => {
    startGame();
    $("#endgameModal").hide();
  });

  $("#spawn01").on("click", () => {
    new BasicEnemy();
  });
  $("#spawn02").on("click", () => {
    new FastEnemy();
  });
  $("#spawn03").on("click", () => {
    new TankEnemy();
  });
  $("#spawn04").on("click", () => {
    new UfoEnemy();
  });
  $("#spawn05").on("click", () => {
    new StrongEnemy();
  });

  window.addEventListener("keydown", function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
});

export default view;
