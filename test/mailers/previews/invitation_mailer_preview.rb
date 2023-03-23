# Preview all emails at http://localhost:3000/rails/mailers/invitation_mailer
class InvitationMailerPreview < ActionMailer::Preview
  def invitation_email
    sender = User.new(email: 'sender@testemail.com')
    invitation = Invitation.new(email: 'johndoe@testemail.com', invited_by: sender)
    InvitationMailer.with(invitation: invitation).invitation_email
  end
end
