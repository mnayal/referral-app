require 'test_helper'

class InvitationMailerTest < ActionMailer::TestCase
  test 'invitation email' do
    sender = User.create(email: 'emailsender@testemail.com', password: 'Password!!')
    invitation = Invitation.create(email: 'johndoeone@testemail.com', invited_by_user_id: sender.id)
    my_email = InvitationMailer.with(invitation: invitation).invitation_email

    assert_emails 1 do
      my_email.deliver_now
    end

    assert_equal ['from@example.com'], my_email.from
    assert_equal ['johndoeone@testemail.com'], my_email.to
    assert_equal 'You have been invited to join our App!', my_email.subject
    assert_match 'emailsender@testemail.com', my_email.html_part.body.encoded
  end
end
