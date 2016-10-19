declare var $;

class Choice {
  constructor(public id: number, public choiceText:string) { }
}

export class MultChoice {
  //data = new DataAPI();
  //node = this.data.getNodeDetails(1);
  //this.data.getContactList().then(contacts => this.contacts = contacts);
  prompt:string = 'prompt';
  correctChoice:number = 0;
  selectedChoice:Choice = null;
  feedbackText:string = '';
  choices:Array<Choice> = [
    new Choice(0, 'The first choice (correct)'),
    new Choice(1, 'The second choice'),
    new Choice(2, 'The third choice')
  ];

  get correct():boolean {
    return this.selectedChoice.id === this.correctChoice;
  }

  submit():void {
    this.clearFeedback();
    if (this.correct) {
      this.feedbackText = 'That is the correct answer';
      $('.feedback-popup p').addClass('correct');
    } else {
      this.feedbackText = 'That was not the correct answer.';
      $('.feedback-popup p').addClass('incorrect');
    }
    $('.feedback-popup').show();
  }

  clear():void {
    this.clearFeedback();
    this.selectedChoice = null;
  }

  clearFeedback():void {
    $('.feedback-popup').hide();
    $('.feedback-popup p').removeClass('correct incorrect');
    this.feedbackText = '';
  }

}