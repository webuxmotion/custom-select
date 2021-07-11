<div class="hero">
  <?=$this->component('logo')?>
  <p class="hero__text">
    This is StarterKit, based on TonePHP framework.</br>
    Create pages, components and user interactions.
  </p>
  <?=$this->component('button', [
    "title" => "See docs",
    "href" => "https://tonephp.com/docs",
    "target" => "_blank"
  ])?>
</div>